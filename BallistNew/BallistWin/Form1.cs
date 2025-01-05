using Newtonsoft.Json;
using System.Xml.Linq;

namespace BallistWin
{
    public partial class Form1 : Form
    {
        List<BulletCard> _bullets;

        List<BulletCard> _bulletChoices;

        string selectedCaliber, selectedBrand;

        public Form1()
        {
            InitializeComponent();
        }

        BallistNew.Load Validate()
        {
            bool isNumeric;

            isNumeric = int.TryParse(MuzzleVelocity.Text, out int mv);
            if (!isNumeric || mv < 1 || mv > 10000)
            {
                MessageBox.Show("Invalid Muzzle Velocity!");
                return null;
            }

            isNumeric = float.TryParse(BallisticCoef.Text, out float bc);
            if (!isNumeric || bc > 2 || bc <= 0)
            {
                MessageBox.Show("Invalid Ballistic Coefficient!");
                return null;
            }
            isNumeric = float.TryParse(SightInHeight.Text, out float sh);
            if (!isNumeric || sh > 10 || sh < -10)
            {
                MessageBox.Show("Invalid Sight In Height!");
                return null;
            }

            isNumeric = int.TryParse(SightInRange.Text, out int sr);
            if (!isNumeric || sr > 1000 || sr < 5)
            {
                MessageBox.Show("Invalid Sight In Range!");
                return null;
            }
            isNumeric = float.TryParse(SightInHeight.Text, out float hs);
            if (!isNumeric || hs > 10 || hs < -10)
            {
                MessageBox.Show("Invalid Sight In Height!");
                return null;
            }

            isNumeric = int.TryParse(BulletWeight.Text, out int bw);
            if (!isNumeric || bw > 1000 || bw < 1)
            {
                MessageBox.Show("Invalid Bullet Weight!");
                return null;
            }

            isNumeric = int.TryParse(ScopeClicks.Text, out int sc);
            if (!isNumeric || sc > 25 || sc < 1)
            {
                MessageBox.Show("Invalid Scope Clicks per Inch/MOA!");
                return null;
            }

            isNumeric = int.TryParse(StartRange.Text, out int str);
            if (!isNumeric || str > 5000 || str < 0)
            {
                MessageBox.Show("Invalid Start Range!");
                return null;
            }

            isNumeric = int.TryParse(EndRange.Text, out int enr);
            if (!isNumeric || enr > 5000 || enr < 5)
            {
                MessageBox.Show("Invalid Ending Range!");
                return null;
            }
            isNumeric = int.TryParse(Increment.Text, out int enc);
            if (!isNumeric || enc > 5000 || enc < 1)
            {
                MessageBox.Show("Invalid Range Encrement!");
                return null;
            }

            return new BallistNew.Load
            {
                MuzzleVelocity = mv,
                BallisticCoefficient = bc,
                SightInHeight = sh,
                SightInRange = sr,
                SightHeight = hs,
                BulletWeight = bw,
                ClicksPerInch = sc,
                StartRange = str,
                EndRange = enr,
                RangeIncrement = enc,
                Caliber = Caliber.Text,
                Brand = Brands.Text,
                Bullet = Bullet.Text
            };
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var load = Validate();

            if (load == null)
                return;


            var BC = new BallistNew.BallistCalc(load);

            var Eo = BC.CalcMuzzleEnergy();

            var boldFont = new Font(OutputGrid.Font, FontStyle.Bold);

            bool isAlt = false;
            var altRowColor = ColorTranslator.FromHtml("#DDDDDD"); // Color.SkyBlue; // .LightGray; // .LightBlue;// .AliceBlue;
            var stdRowColor = Color.White;

            OutputGrid.Items.Clear();

            //OutputGrid.BackColor = Color.Lime;

            for (int range = int.Parse(StartRange.Text); range <= int.Parse(EndRange.Text); range += int.Parse(Increment.Text))
            {
                var res = BC.GetBallisticsAtRange(range);

                int clicks = (int)(res.AdjustMOA * load.ClicksPerInch);

                if (clicks >= 1000 || clicks <= -1000)
                    clicks = 0;


                var itm = new ListViewItem(new string[] { res.Distance.ToString(), ((int)res.Velocity).ToString(), res.PointOfImact.ToString("F1"), clicks.ToString(), res.AdjustMOA.ToString("F2"), res.Energy.ToString(), res.TimeOfFlight.ToString("F3"), "" });
                if (isAlt)
                {
                    for (int x = 0; x < itm.SubItems.Count; x++)
                        itm.SubItems[x].BackColor = isAlt ? altRowColor : stdRowColor;
                }



                itm.UseItemStyleForSubItems = false;
                itm.SubItems[2].Font = boldFont;


                OutputGrid.Items.Add(itm);

                isAlt = !isAlt;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            for (int x=0; x<OutputGrid.Columns.Count; x++)
                OutputGrid.Columns[x].Width = -2;

            var g = File.ReadAllText("bullets.json");

            _bullets = JsonConvert.DeserializeObject<List<BulletCard>>(g);

            var calibers = _bullets.Select(a => a.Caliber).Distinct().ToArray();

            Array.Sort(calibers);

            Caliber.Items.Clear();

            Caliber.Items.Add("Caliber...");

            foreach (var caliber in calibers)
                Caliber.Items.Add(caliber);

            Caliber.SelectedIndex = 0;

            var c = 5;
        }

        private void Caliber_SelectedIndexChanged(object sender, EventArgs e)
        {
            Brands.Items.Clear();
            selectedCaliber = "";

            if (Caliber.SelectedIndex < 1)
                return;

            selectedCaliber = Caliber.SelectedItem.ToString();

            var brands = _bullets.Where(b => b.Caliber == selectedCaliber).Select(a => a.Manufacturer).Distinct().ToArray();

            Array.Sort(brands);

            Brands.Items.Add("Brand...");

            foreach (var brand in brands)
                Brands.Items.Add(brand);

            Brands.SelectedIndex = 0;
        }

        private void Brands_SelectedIndexChanged(object sender, EventArgs e)
        {
            Bullet.Items.Clear();

            if (Brands.SelectedIndex < 1)
                return;

            selectedBrand = Brands.SelectedItem.ToString();

            _bulletChoices = _bullets.Where(b => b.Caliber == selectedCaliber && b.Manufacturer == selectedBrand).OrderBy(b => b.Weight).ThenBy(b => b.Bullet).ToList();

            Bullet.Items.Add("Bullet...");

            foreach (var bullet in _bulletChoices)
                Bullet.Items.Add(string.Concat(bullet.Weight.ToString(), "gr ", bullet.Bullet, " ", bullet.BC.ToString(), " G1 BC"));

            Bullet.SelectedIndex = 0;
        }

        private void Bullet_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (Bullet.SelectedIndex < 1)
                return;

            var selectedBullet = _bulletChoices[Bullet.SelectedIndex - 1];

            BallisticCoef.Text = selectedBullet.BC.ToString();
            BulletWeight.Text = selectedBullet.Weight.ToString();
        }

        private void groupBox4_Enter(object sender, EventArgs e)
        {

        }

        private void Brands_SelectedIndexChanged_1(object sender, EventArgs e)
        {

        }

        private void hScrollBar1_Scroll(object sender, ScrollEventArgs e)
        {
            MuzzleVelocity.Text = VelScroll.Value.ToString();

            button1_Click(sender, e);
        }

        private void MuzzleVelocity_TextChanged(object sender, EventArgs e)
        {
            bool isNumeric = int.TryParse(MuzzleVelocity.Text, out int vel);
            if (!isNumeric)
                return;


            if (vel >= VelScroll.Minimum && vel <= VelScroll.Maximum && vel != VelScroll.Value)
                VelScroll.Value = int.Parse(MuzzleVelocity.Text);
        }

        private void groupBox3_Enter(object sender, EventArgs e)
        {

        }

        private void MuzzleVelocity_KeyPress(object sender, KeyPressEventArgs e)
        {

        }

        private void SightInHeight_KeyPress(object sender, KeyPressEventArgs e)
        {

        }

        private void SightInHeightScroll_Scroll(object sender, ScrollEventArgs e)
        {
            SightInHeight.Text = ((float)SightInHeightScroll.Value / 10.0).ToString();
            button1_Click(sender, e);
        }

        private void SightInRange_KeyPress(object sender, KeyPressEventArgs e)
        {

        }

        private void SightInRangeScroll_Scroll(object sender, ScrollEventArgs e)
        {
            SightInRange.Text = SightInRangeScroll.Value.ToString();
            button1_Click(sender, e);
        }

        private void SightInHeight_TextChanged(object sender, EventArgs e)
        {
            bool isNumeric = float.TryParse(SightInHeight.Text, out float rng);
            if (!isNumeric)
                return;

            int hgt = (int)rng * 10;
            if (hgt >= SightInHeightScroll.Minimum && hgt <= SightInHeightScroll.Maximum && hgt != SightInHeightScroll.Value)
                SightInHeightScroll.Value = hgt;
        }

        private void SightInRange_TextChanged(object sender, EventArgs e)
        {
            bool isNumeric = int.TryParse(SightInRange.Text, out int rng);
            if (!isNumeric)
                return;

            if (rng >= SightInRangeScroll.Minimum && rng <= SightInRangeScroll.Maximum && rng != SightInRangeScroll.Value)
                SightInRangeScroll.Value = rng;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog1 = new SaveFileDialog();
            saveFileDialog1.Filter = "LOAD|*.load";
            saveFileDialog1.Title = "Save a Load File";
            saveFileDialog1.ShowDialog();

            var fil = saveFileDialog1.FileName;

            if (fil == null || fil == "")
                return;

            var load = Validate();

            var js = JsonConvert.SerializeObject(load);

            File.WriteAllText(fil, js);

        }

        private void button3_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "LOAD|*.load";
            openFileDialog.Title = "Open a Load File";
            openFileDialog.ShowDialog();
            var fil = openFileDialog.FileName;

            if (fil == null || fil == "")
                return;

            var js = File.ReadAllText(fil);

            var load = JsonConvert.DeserializeObject<BallistNew.Load>(js);

            MuzzleVelocity.Text = load.MuzzleVelocity.ToString();
            BallisticCoef.Text = load.BallisticCoefficient.ToString();
            SightInHeight.Text = load.SightInHeight.ToString();
            SightInRange.Text = load.SightInRange.ToString();
            BulletWeight.Text = load.BulletWeight.ToString();
            ScopeClicks.Text = load.ClicksPerInch.ToString();
            StartRange.Text = load.StartRange.ToString();
            EndRange.Text = load.EndRange.ToString();
            Increment.Text = load.RangeIncrement.ToString();

            selectedCaliber = load.Caliber;

            Caliber.SelectedItem = selectedCaliber;



            var brands = _bullets.Where(b => b.Caliber == selectedCaliber).Select(a => a.Manufacturer).Distinct().ToArray();

            Array.Sort(brands);

            Brands.Items.Add("Brand...");

            foreach (var brand in brands)
                Brands.Items.Add(brand);

            selectedBrand = load.Brand;
            Brands.SelectedItem = selectedBrand;

            _bulletChoices = _bullets.Where(b => b.Caliber == selectedCaliber && b.Manufacturer == selectedBrand).OrderBy(b => b.Weight).ThenBy(b => b.Bullet).ToList();

            Bullet.Items.Add("Bullet...");

            foreach (var bullet in _bulletChoices)
                Bullet.Items.Add(string.Concat(bullet.Weight.ToString(), "gr ", bullet.Bullet, " ", bullet.BC.ToString(), " G1 BC"));

            Bullet.SelectedItem = load.Bullet;




            button1_Click(sender, e);

        }

        private void button4_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog1 = new SaveFileDialog();
            saveFileDialog1.Filter = "CSV|*.csv";
            saveFileDialog1.Title = "Save output to CSV";
            saveFileDialog1.ShowDialog();

            var fil = saveFileDialog1.FileName;

            if (fil == null || fil == "")
                return;

            ListViewToCSV.ToCSV(OutputGrid, fil, true);
        }
    }
}
