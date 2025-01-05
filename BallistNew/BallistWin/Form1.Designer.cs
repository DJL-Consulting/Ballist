namespace BallistWin
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button1 = new Button();
            HeightOfSight = new TextBox();
            label5 = new Label();
            label10 = new Label();
            OutputGrid = new ListView();
            Velocity = new ColumnHeader();
            Impact = new ColumnHeader();
            Clicks = new ColumnHeader();
            Adjust = new ColumnHeader();
            Energy = new ColumnHeader();
            TimeOfFlight = new ColumnHeader();
            label13 = new Label();
            ScopeClicks = new TextBox();
            label14 = new Label();
            groupBox1 = new GroupBox();
            label20 = new Label();
            label19 = new Label();
            label18 = new Label();
            Increment = new TextBox();
            label17 = new Label();
            EndRange = new TextBox();
            label16 = new Label();
            StartRange = new TextBox();
            label15 = new Label();
            groupBox2 = new GroupBox();
            groupBox3 = new GroupBox();
            Bullet = new ComboBox();
            Brands = new ComboBox();
            Caliber = new ComboBox();
            label11 = new Label();
            BulletWeight = new TextBox();
            label12 = new Label();
            label7 = new Label();
            BallisticCoef = new TextBox();
            label2 = new Label();
            groupBox4 = new GroupBox();
            SightInRangeScroll = new HScrollBar();
            SightInHeightScroll = new HScrollBar();
            VelScroll = new HScrollBar();
            label9 = new Label();
            label8 = new Label();
            label6 = new Label();
            SightInRange = new TextBox();
            label4 = new Label();
            SightInHeight = new TextBox();
            label3 = new Label();
            MuzzleVelocity = new TextBox();
            label1 = new Label();
            button2 = new Button();
            button3 = new Button();
            button4 = new Button();
            columnHeader1 = new ColumnHeader();
            groupBox1.SuspendLayout();
            groupBox2.SuspendLayout();
            groupBox3.SuspendLayout();
            groupBox4.SuspendLayout();
            SuspendLayout();
            // 
            // button1
            // 
            button1.BackColor = Color.PaleGreen;
            button1.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 0);
            button1.Location = new Point(211, 603);
            button1.Name = "button1";
            button1.Size = new Size(191, 118);
            button1.TabIndex = 0;
            button1.Text = "Calculate";
            button1.UseVisualStyleBackColor = false;
            button1.Click += button1_Click;
            // 
            // HeightOfSight
            // 
            HeightOfSight.Font = new Font("Segoe UI", 11F);
            HeightOfSight.Location = new Point(226, 25);
            HeightOfSight.Name = "HeightOfSight";
            HeightOfSight.Size = new Size(70, 32);
            HeightOfSight.TabIndex = 10;
            HeightOfSight.Text = "1.5";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Font = new Font("Segoe UI", 10.8F);
            label5.Location = new Point(31, 23);
            label5.Name = "label5";
            label5.Size = new Size(189, 25);
            label5.TabIndex = 9;
            label5.Text = "Height of Sight/Scope";
            // 
            // label10
            // 
            label10.AutoSize = true;
            label10.Font = new Font("Segoe UI", 10.8F);
            label10.Location = new Point(302, 23);
            label10.Name = "label10";
            label10.Size = new Size(61, 25);
            label10.TabIndex = 15;
            label10.Text = "inches";
            // 
            // OutputGrid
            // 
            OutputGrid.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            OutputGrid.Columns.AddRange(new ColumnHeader[] { columnHeader1, Velocity, Impact, Clicks, Adjust, Energy, TimeOfFlight });
            OutputGrid.Font = new Font("Segoe UI", 16.2F, FontStyle.Regular, GraphicsUnit.Point, 0);
            OutputGrid.FullRowSelect = true;
            OutputGrid.GridLines = true;
            OutputGrid.HeaderStyle = ColumnHeaderStyle.Nonclickable;
            OutputGrid.Location = new Point(584, 12);
            OutputGrid.MultiSelect = false;
            OutputGrid.Name = "OutputGrid";
            OutputGrid.Size = new Size(788, 760);
            OutputGrid.TabIndex = 16;
            OutputGrid.UseCompatibleStateImageBehavior = false;
            OutputGrid.View = View.Details;
            // 
            // Velocity
            // 
            Velocity.Text = "Velocity";
            Velocity.TextAlign = HorizontalAlignment.Center;
            Velocity.Width = 150;
            // 
            // Impact
            // 
            Impact.Text = "Impact";
            Impact.TextAlign = HorizontalAlignment.Center;
            Impact.Width = 150;
            // 
            // Clicks
            // 
            Clicks.Text = "Clicks";
            Clicks.TextAlign = HorizontalAlignment.Center;
            Clicks.Width = 150;
            // 
            // Adjust
            // 
            Adjust.Text = "Adj MOA";
            Adjust.TextAlign = HorizontalAlignment.Center;
            Adjust.Width = 150;
            // 
            // Energy
            // 
            Energy.Text = "Energy";
            Energy.TextAlign = HorizontalAlignment.Center;
            Energy.Width = 150;
            // 
            // TimeOfFlight
            // 
            TimeOfFlight.Text = "TOF (s)";
            TimeOfFlight.TextAlign = HorizontalAlignment.Center;
            TimeOfFlight.Width = 150;
            // 
            // label13
            // 
            label13.AutoSize = true;
            label13.Font = new Font("Segoe UI", 10.8F);
            label13.Location = new Point(302, 63);
            label13.Name = "label13";
            label13.Size = new Size(97, 25);
            label13.TabIndex = 22;
            label13.Text = "@ 100 yds";
            // 
            // ScopeClicks
            // 
            ScopeClicks.Font = new Font("Segoe UI", 11F);
            ScopeClicks.Location = new Point(226, 63);
            ScopeClicks.Name = "ScopeClicks";
            ScopeClicks.Size = new Size(70, 32);
            ScopeClicks.TabIndex = 11;
            ScopeClicks.Text = "4";
            // 
            // label14
            // 
            label14.AutoSize = true;
            label14.Font = new Font("Segoe UI", 10.8F);
            label14.Location = new Point(20, 63);
            label14.Name = "label14";
            label14.Size = new Size(200, 25);
            label14.TabIndex = 21;
            label14.Text = "Sight Clicks Per In/MOA";
            // 
            // groupBox1
            // 
            groupBox1.Controls.Add(label20);
            groupBox1.Controls.Add(label19);
            groupBox1.Controls.Add(label18);
            groupBox1.Controls.Add(Increment);
            groupBox1.Controls.Add(label17);
            groupBox1.Controls.Add(EndRange);
            groupBox1.Controls.Add(label16);
            groupBox1.Controls.Add(StartRange);
            groupBox1.Controls.Add(label15);
            groupBox1.Location = new Point(13, 447);
            groupBox1.Name = "groupBox1";
            groupBox1.Size = new Size(564, 141);
            groupBox1.TabIndex = 35;
            groupBox1.TabStop = false;
            groupBox1.Text = "Output Grid Choices";
            // 
            // label20
            // 
            label20.AutoSize = true;
            label20.Font = new Font("Segoe UI", 10.8F);
            label20.Location = new Point(308, 95);
            label20.Name = "label20";
            label20.Size = new Size(55, 25);
            label20.TabIndex = 40;
            label20.Text = "yards";
            // 
            // label19
            // 
            label19.AutoSize = true;
            label19.Font = new Font("Segoe UI", 10.8F);
            label19.Location = new Point(308, 62);
            label19.Name = "label19";
            label19.Size = new Size(55, 25);
            label19.TabIndex = 39;
            label19.Text = "yards";
            // 
            // label18
            // 
            label18.AutoSize = true;
            label18.Font = new Font("Segoe UI", 10.8F);
            label18.Location = new Point(308, 25);
            label18.Name = "label18";
            label18.Size = new Size(55, 25);
            label18.TabIndex = 38;
            label18.Text = "yards";
            // 
            // Increment
            // 
            Increment.Font = new Font("Segoe UI", 11F);
            Increment.Location = new Point(226, 92);
            Increment.Name = "Increment";
            Increment.Size = new Size(70, 32);
            Increment.TabIndex = 14;
            Increment.Text = "50";
            // 
            // label17
            // 
            label17.AutoSize = true;
            label17.Font = new Font("Segoe UI", 10.8F);
            label17.Location = new Point(106, 92);
            label17.Name = "label17";
            label17.Size = new Size(91, 25);
            label17.TabIndex = 37;
            label17.Text = "Increment";
            // 
            // EndRange
            // 
            EndRange.Font = new Font("Segoe UI", 11F);
            EndRange.Location = new Point(226, 59);
            EndRange.Name = "EndRange";
            EndRange.Size = new Size(70, 32);
            EndRange.TabIndex = 13;
            EndRange.Text = "800";
            // 
            // label16
            // 
            label16.AutoSize = true;
            label16.Font = new Font("Segoe UI", 10.8F);
            label16.Location = new Point(106, 58);
            label16.Name = "label16";
            label16.Size = new Size(97, 25);
            label16.TabIndex = 35;
            label16.Text = "End Range";
            // 
            // StartRange
            // 
            StartRange.Font = new Font("Segoe UI", 11F);
            StartRange.Location = new Point(226, 26);
            StartRange.Name = "StartRange";
            StartRange.Size = new Size(70, 32);
            StartRange.TabIndex = 12;
            StartRange.Text = "0";
            // 
            // label15
            // 
            label15.AutoSize = true;
            label15.Font = new Font("Segoe UI", 10.8F);
            label15.Location = new Point(106, 26);
            label15.Name = "label15";
            label15.Size = new Size(103, 25);
            label15.TabIndex = 33;
            label15.Text = "Start Range";
            // 
            // groupBox2
            // 
            groupBox2.Controls.Add(label10);
            groupBox2.Controls.Add(label5);
            groupBox2.Controls.Add(HeightOfSight);
            groupBox2.Controls.Add(label14);
            groupBox2.Controls.Add(ScopeClicks);
            groupBox2.Controls.Add(label13);
            groupBox2.Location = new Point(13, 324);
            groupBox2.Name = "groupBox2";
            groupBox2.Size = new Size(564, 117);
            groupBox2.TabIndex = 36;
            groupBox2.TabStop = false;
            groupBox2.Text = "Gun Data";
            // 
            // groupBox3
            // 
            groupBox3.Controls.Add(Bullet);
            groupBox3.Controls.Add(Brands);
            groupBox3.Controls.Add(Caliber);
            groupBox3.Controls.Add(label11);
            groupBox3.Controls.Add(BulletWeight);
            groupBox3.Controls.Add(label12);
            groupBox3.Controls.Add(label7);
            groupBox3.Controls.Add(BallisticCoef);
            groupBox3.Controls.Add(label2);
            groupBox3.Location = new Point(12, 3);
            groupBox3.Name = "groupBox3";
            groupBox3.Size = new Size(565, 166);
            groupBox3.TabIndex = 37;
            groupBox3.TabStop = false;
            groupBox3.Text = "Bullet Data - Use picker boxes or input your BC/weight directly";
            groupBox3.Enter += groupBox3_Enter;
            // 
            // Bullet
            // 
            Bullet.DropDownStyle = ComboBoxStyle.DropDownList;
            Bullet.Font = new Font("Segoe UI", 11F);
            Bullet.FormattingEnabled = true;
            Bullet.Location = new Point(307, 36);
            Bullet.Name = "Bullet";
            Bullet.Size = new Size(252, 33);
            Bullet.TabIndex = 2;
            Bullet.SelectedIndexChanged += Bullet_SelectedIndexChanged;
            // 
            // Brands
            // 
            Brands.DropDownStyle = ComboBoxStyle.DropDownList;
            Brands.Font = new Font("Segoe UI", 11F);
            Brands.FormattingEnabled = true;
            Brands.Location = new Point(114, 36);
            Brands.Name = "Brands";
            Brands.Size = new Size(187, 33);
            Brands.TabIndex = 1;
            Brands.SelectedIndexChanged += Brands_SelectedIndexChanged;
            // 
            // Caliber
            // 
            Caliber.DropDownStyle = ComboBoxStyle.DropDownList;
            Caliber.Font = new Font("Segoe UI", 11F);
            Caliber.FormattingEnabled = true;
            Caliber.Location = new Point(7, 36);
            Caliber.Name = "Caliber";
            Caliber.Size = new Size(101, 33);
            Caliber.TabIndex = 0;
            Caliber.SelectedIndexChanged += Caliber_SelectedIndexChanged;
            // 
            // label11
            // 
            label11.AutoSize = true;
            label11.Font = new Font("Segoe UI", 10.8F);
            label11.Location = new Point(307, 124);
            label11.Name = "label11";
            label11.Size = new Size(60, 25);
            label11.TabIndex = 40;
            label11.Text = "grains";
            // 
            // BulletWeight
            // 
            BulletWeight.Font = new Font("Segoe UI", 11F);
            BulletWeight.Location = new Point(231, 124);
            BulletWeight.Name = "BulletWeight";
            BulletWeight.Size = new Size(70, 32);
            BulletWeight.TabIndex = 6;
            BulletWeight.Text = "180";
            // 
            // label12
            // 
            label12.AutoSize = true;
            label12.Font = new Font("Segoe UI", 10.8F);
            label12.Location = new Point(99, 127);
            label12.Name = "label12";
            label12.Size = new Size(116, 25);
            label12.TabIndex = 39;
            label12.Text = "Bullet Weight";
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Font = new Font("Segoe UI", 10.8F);
            label7.Location = new Point(307, 85);
            label7.Name = "label7";
            label7.Size = new Size(34, 25);
            label7.TabIndex = 38;
            label7.Text = "G1";
            // 
            // BallisticCoef
            // 
            BallisticCoef.Font = new Font("Segoe UI", 11F);
            BallisticCoef.Location = new Point(231, 86);
            BallisticCoef.Name = "BallisticCoef";
            BallisticCoef.Size = new Size(70, 32);
            BallisticCoef.TabIndex = 5;
            BallisticCoef.Text = ".431";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 10.8F);
            label2.Location = new Point(60, 85);
            label2.Name = "label2";
            label2.Size = new Size(158, 25);
            label2.TabIndex = 35;
            label2.Text = "Ballistic Coefficient";
            // 
            // groupBox4
            // 
            groupBox4.Controls.Add(SightInRangeScroll);
            groupBox4.Controls.Add(SightInHeightScroll);
            groupBox4.Controls.Add(VelScroll);
            groupBox4.Controls.Add(label9);
            groupBox4.Controls.Add(label8);
            groupBox4.Controls.Add(label6);
            groupBox4.Controls.Add(SightInRange);
            groupBox4.Controls.Add(label4);
            groupBox4.Controls.Add(SightInHeight);
            groupBox4.Controls.Add(label3);
            groupBox4.Controls.Add(MuzzleVelocity);
            groupBox4.Controls.Add(label1);
            groupBox4.Location = new Point(13, 175);
            groupBox4.Name = "groupBox4";
            groupBox4.Size = new Size(564, 143);
            groupBox4.TabIndex = 38;
            groupBox4.TabStop = false;
            groupBox4.Text = "Range/Chrono Data";
            groupBox4.Enter += groupBox4_Enter;
            // 
            // SightInRangeScroll
            // 
            SightInRangeScroll.LargeChange = 100;
            SightInRangeScroll.Location = new Point(363, 104);
            SightInRangeScroll.Maximum = 1000;
            SightInRangeScroll.Minimum = 5;
            SightInRangeScroll.Name = "SightInRangeScroll";
            SightInRangeScroll.Size = new Size(186, 26);
            SightInRangeScroll.SmallChange = 25;
            SightInRangeScroll.TabIndex = 26;
            SightInRangeScroll.Value = 100;
            SightInRangeScroll.Scroll += SightInRangeScroll_Scroll;
            // 
            // SightInHeightScroll
            // 
            SightInHeightScroll.LargeChange = 5;
            SightInHeightScroll.Location = new Point(363, 67);
            SightInHeightScroll.Maximum = 50;
            SightInHeightScroll.Minimum = -50;
            SightInHeightScroll.Name = "SightInHeightScroll";
            SightInHeightScroll.Size = new Size(186, 26);
            SightInHeightScroll.TabIndex = 25;
            SightInHeightScroll.Value = 20;
            SightInHeightScroll.Scroll += SightInHeightScroll_Scroll;
            // 
            // VelScroll
            // 
            VelScroll.LargeChange = 100;
            VelScroll.Location = new Point(363, 25);
            VelScroll.Maximum = 4400;
            VelScroll.Minimum = 1000;
            VelScroll.Name = "VelScroll";
            VelScroll.Size = new Size(186, 26);
            VelScroll.SmallChange = 25;
            VelScroll.TabIndex = 24;
            VelScroll.Value = 3200;
            VelScroll.Scroll += hScrollBar1_Scroll;
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Font = new Font("Segoe UI", 10.8F);
            label9.Location = new Point(305, 97);
            label9.Name = "label9";
            label9.Size = new Size(55, 25);
            label9.TabIndex = 23;
            label9.Text = "yards";
            // 
            // label8
            // 
            label8.AutoSize = true;
            label8.Font = new Font("Segoe UI", 10.8F);
            label8.Location = new Point(305, 60);
            label8.Name = "label8";
            label8.Size = new Size(44, 25);
            label8.TabIndex = 22;
            label8.Text = "inch";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Font = new Font("Segoe UI", 10.8F);
            label6.Location = new Point(306, 25);
            label6.Name = "label6";
            label6.Size = new Size(39, 25);
            label6.TabIndex = 21;
            label6.Text = "ft/s";
            // 
            // SightInRange
            // 
            SightInRange.Font = new Font("Segoe UI", 11F);
            SightInRange.Location = new Point(229, 98);
            SightInRange.Name = "SightInRange";
            SightInRange.Size = new Size(70, 32);
            SightInRange.TabIndex = 9;
            SightInRange.Text = "100";
            SightInRange.TextChanged += SightInRange_TextChanged;
            SightInRange.KeyPress += SightInRange_KeyPress;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Segoe UI", 10.8F);
            label4.Location = new Point(86, 97);
            label4.Name = "label4";
            label4.Size = new Size(130, 25);
            label4.TabIndex = 19;
            label4.Text = "Sight-In Range";
            // 
            // SightInHeight
            // 
            SightInHeight.Font = new Font("Segoe UI", 11F);
            SightInHeight.Location = new Point(229, 61);
            SightInHeight.Name = "SightInHeight";
            SightInHeight.Size = new Size(70, 32);
            SightInHeight.TabIndex = 8;
            SightInHeight.Text = "2";
            SightInHeight.TextChanged += SightInHeight_TextChanged;
            SightInHeight.KeyPress += SightInHeight_KeyPress;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 10.8F);
            label3.Location = new Point(83, 60);
            label3.Name = "label3";
            label3.Size = new Size(133, 25);
            label3.TabIndex = 17;
            label3.Text = "Sight-In Height";
            // 
            // MuzzleVelocity
            // 
            MuzzleVelocity.Font = new Font("Segoe UI", 11F);
            MuzzleVelocity.Location = new Point(230, 26);
            MuzzleVelocity.Name = "MuzzleVelocity";
            MuzzleVelocity.Size = new Size(70, 32);
            MuzzleVelocity.TabIndex = 7;
            MuzzleVelocity.Text = "3200";
            MuzzleVelocity.TextChanged += MuzzleVelocity_TextChanged;
            MuzzleVelocity.KeyPress += MuzzleVelocity_KeyPress;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 10.8F);
            label1.Location = new Point(87, 26);
            label1.Name = "label1";
            label1.Size = new Size(133, 25);
            label1.TabIndex = 15;
            label1.Text = "Muzzle Velocity";
            // 
            // button2
            // 
            button2.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 0);
            button2.Location = new Point(19, 594);
            button2.Name = "button2";
            button2.Size = new Size(163, 61);
            button2.TabIndex = 39;
            button2.Text = "Save";
            button2.UseVisualStyleBackColor = true;
            button2.Click += button2_Click;
            // 
            // button3
            // 
            button3.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 0);
            button3.Location = new Point(19, 675);
            button3.Name = "button3";
            button3.Size = new Size(163, 61);
            button3.TabIndex = 40;
            button3.Text = "Load";
            button3.UseVisualStyleBackColor = true;
            button3.Click += button3_Click;
            // 
            // button4
            // 
            button4.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 0);
            button4.Location = new Point(444, 618);
            button4.Name = "button4";
            button4.Size = new Size(127, 89);
            button4.TabIndex = 41;
            button4.Text = "Excel Export";
            button4.UseVisualStyleBackColor = true;
            button4.Click += button4_Click;
            // 
            // columnHeader1
            // 
            columnHeader1.Text = "Range";
            columnHeader1.TextAlign = HorizontalAlignment.Center;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoSize = true;
            ClientSize = new Size(1388, 784);
            Controls.Add(button4);
            Controls.Add(button3);
            Controls.Add(button2);
            Controls.Add(groupBox4);
            Controls.Add(groupBox3);
            Controls.Add(groupBox2);
            Controls.Add(groupBox1);
            Controls.Add(OutputGrid);
            Controls.Add(button1);
            Name = "Form1";
            Text = "Going Ballistic, Jr";
            Load += Form1_Load;
            groupBox1.ResumeLayout(false);
            groupBox1.PerformLayout();
            groupBox2.ResumeLayout(false);
            groupBox2.PerformLayout();
            groupBox3.ResumeLayout(false);
            groupBox3.PerformLayout();
            groupBox4.ResumeLayout(false);
            groupBox4.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private Button button1;
        private TextBox HeightOfSight;
        private Label label5;
        private Label label10;
        private ListView OutputGrid;
        private ColumnHeader Velocity;
        private ColumnHeader Impact;
        private ColumnHeader Adjust;
        private ColumnHeader TimeOfFlight;
        private Label label13;
        private TextBox ScopeClicks;
        private Label label14;
        private ColumnHeader Clicks;
        private GroupBox groupBox1;
        private Label label20;
        private Label label19;
        private Label label18;
        private TextBox Increment;
        private Label label17;
        private TextBox EndRange;
        private Label label16;
        private TextBox StartRange;
        private Label label15;
        private GroupBox groupBox2;
        private GroupBox groupBox3;
        private ComboBox Bullet;
        private ComboBox Brands;
        private ComboBox Caliber;
        private Label label11;
        private TextBox BulletWeight;
        private Label label12;
        private Label label7;
        private TextBox BallisticCoef;
        private Label label2;
        private GroupBox groupBox4;
        private Label label9;
        private Label label8;
        private Label label6;
        private TextBox SightInRange;
        private Label label4;
        private TextBox SightInHeight;
        private Label label3;
        private TextBox MuzzleVelocity;
        private Label label1;
        private HScrollBar VelScroll;
        private HScrollBar SightInHeightScroll;
        private HScrollBar SightInRangeScroll;
        private Button button2;
        private Button button3;
        private ColumnHeader Energy;
        private Button button4;
        private ColumnHeader columnHeader2;
        private ColumnHeader columnHeader1;
    }
}
