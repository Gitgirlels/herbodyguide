document.addEventListener('DOMContentLoaded', function() {
  const sidebarHTML = `
    <div id="sidebar" class="sidebar">
        <!-- Sidebar content -->
        <ul class="sidebar-nav">
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Conceiving Confidently <span class="section-toggle">◀</span>
                </button>
                <ul class="section-content">
                    <li><a href="post1.html">Factors affecting fertilization</a></li>
                    <li><a href="post2.html">Reproductive Anatomy</a></li>
                    <li><a href="post3.html">Prenatal Vitamins</a></li>
                    <li><a href="miscarriage.html">Miscarriage</a></li>
                    <li><a href="hormones.html">Reproductive Hormones</a></li>
                    <li><a href="what-is-fertility.html">What is Fertility?</a></li>
                    <li><a href="pcos.html">PCOS</a></li>
                    <li><a href="ivfegg.html">IVF and Egg Freezing</a></li>
                    <li><a href="pregtest.html">Pregnancy Tests</a></li>
                    <li><a href="twins.html">Twins</a></li>
                    <li><a href="iui.html">IUI</a></li>
                    <li><a href="bloodtests.html">Blood tests</a></li>
                    <li><a href="letrozole.html">Letrozole</a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Contraception<span class="section-toggle">◀</span>
                </button>   
                <ul class="section-content">
                    <li><a href="birthcontrolpills.html">Birth Control pills</a></li>
                    <li><a href="iud.html">IUD</a></li>
                    <li><a href="rod.html">Contraceptive implant - The Rod</a></li>
                    <li><a href="condoms.html">The Science of Condoms</a></li>
                    <li><a href="virginity.html">Virginity</a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Female anatomy and conditions <span class="section-toggle">◀</span>
                </button>  
                <ul class="section-content">
                    <li><a href="post2.html"> Reproductive Anatomy</a></li>
                    <li><a href="hormones.html">Reproductive Hormones</a></li>
                    <li><a href="pcos.html">PCOS</a></li>
                    <li><a href="endometriosis.html">Endometriosis</a></li>
                    <li><a href="endobelly.html">Endobelly</a></li>
                    <li><a href="cysts.html">Ovarian Cysts</a></li>
                    <li><a href="vagina.html">The Vagina</a></li> 
                    <li><a href="menopause.html"> Menopause and perimenopause</a></li>
                    <li><a href="uterus.html"> The Uterus</a></li>
                    <li><a href="breastcancer.html"> Breast Cancer</a></li>
                    <li><a href="migraines.html"> Migraines and Women</a></li>
                    <li><a href="hpv.html"> Human Papillomavirus (HPV)</a></li>
           <li><a href="lapendo.html"> Laparoscopic endometrius excision surgery</a></li>
                </ul>
            </li>

            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Menstruation <span class="section-toggle">◀</span>
                </button> 
                <ul class="section-content">
                    <li><a href="period.html">Period</a></li>
                    <li><a href="birthcontrolpills.html">Birth Control pills</a></li>
                    <li><a href="cramps.html">Period Cramps</a></li>
                    <li><a href="cluevsflo.html">Clue vs Flo</a></li>
                    <li><a href="tampons.html">Tampons</a></li>
                    <li><a href="animalperiod.html">Animals That Menstruate</a></li>
                    <li><a href="pmdd.html"> Premenstrual Dysphoric Disorder (PMDD) </a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Pregnancy <span class="section-toggle">◀</span>
                </button>  
                <ul class="section-content">
                    <li><a href="morning-sickness.html">Morning Sickness</a></li>
                    <li><a href="breastfeeding.html">Breastfeeding</a></li>
                    <li><a href="ultrasoundlmp.html">Pregnancy Dating</a></li>
                    <li><a href="blood.html">The Science of blood</a></li>
                    <li><a href="post3.html">Prenatal Vitamins</a></li>
                    <li><a href="miscarriage.html">Miscarriage</a></li>
                    <li><a href="pregfoods.html">Pregnancy dietary restrictions</a></li>
                    <li><a href="laborinduction.html">The Science of Labor Induction Methods</a></li>
                    <li><a href="gender.html">Gender predicting & Old wives tales</a></li>
                    <li><a href="chempreg.html">Chemical Pregnancy</a></li>
                    <li><a href="pregtest.html">Pregnancy Tests</a></li>
                    <li><a href="twins.html">Twins</a></li>
                    <li><a href="laborinduction.html">Labor Induction</a></li>
                    <li><a href="vaccinebaby.html">Infant Vaccinations</a></li>
                    <li><a href="homebirths.html">Home Births</a></li>
                    <li><a href="pregsym.html"> Pregnancy symptoms</a></li>
                    <li><a href="fetalgrowth.html">Fetal Growth</a></li>
                    <li><a href="gestdiab.html">Gestational Diabetes</a></li>
          <li><a href="molarpreg.html">Molar Pregnancy</a></li>
            <li><a href="preeclampsia.html">Preeclampsia</a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Legal Rights <span class="section-toggle">◀</span>
                </button>  
                <ul class="section-content">
                    <li><a href="what-is-consent.html">What is Consent?</a></li>
                    <li><a href="birthratedecline.html">The Global birth rate Decline</a></li>
                    <li><a href="dv.html">Partner and Sexual Violance</a></li>
                </ul>
            </li>
        </ul> 
    </div>
  `;
  
  // Insert the sidebar into the page
  document.getElementById('sidebar-container').innerHTML = sidebarHTML;
});
