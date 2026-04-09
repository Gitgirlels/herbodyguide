document.addEventListener('DOMContentLoaded', function() {

  // Inject search bar styles
  const style = document.createElement('style');
  style.textContent = `
    .search-container {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 6px 12px;
      gap: 8px;
    }
    .search-wrapper input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      width: 100%;
      color: #333;
    }
    .search-wrapper button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      padding: 0;
      line-height: 1;
    }
    .search-results {
      padding: 0 16px 8px;
      font-size: 13px;
    }
    .search-results a {
      display: block;
      padding: 5px 0;
      color: #c2507a;
      text-decoration: none;
      border-bottom: 1px solid #f0f0f0;
    }
    .search-results a:hover {
      text-decoration: underline;
    }
    .search-results .no-results {
      color: #999;
      padding: 6px 0;
    }
  `;
  document.head.appendChild(style);

  const sidebarHTML = `
    <div id="sidebar" class="sidebar">

        <!-- Search Bar -->
        <div class="search-container">
          <div class="search-wrapper">
            <span>🔍</span>
            <input type="text" id="siteSearch" placeholder="Search articles..." />
          </div>
          <div class="search-results" id="searchResults"></div>
        </div>

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
                    <li><a href="maleinf.html">Male infertility</a></li>
                    <li><a href="testosterone.html">Testosterone</a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Contraception<span class="section-toggle">◀</span>
                </button>   
                <ul class="section-content">
                    <li><a href="birthcontrolpills.html">Birth Control pills</a></li>
                    <li><a href="iud.html">IUD Intrauterine device</a></li>
                      <li><a href="pull.html">The Pull Out Method</a></li>
                    <li><a href="rod.html">Contraceptive implant - The Rod</a></li>
                    <li><a href="condoms.html">The Science of Condoms</a></li>
                    <li><a href="virginity.html">Virginity</a></li>
                    <li><a href="pillsymptoms.html">Pill Symptoms Scientific</a></li>
                </ul>
            </li>
            
            <li class="nav-section">
                <button class="section-header" onclick="toggleSection(this)">
                    Female anatomy and conditions <span class="section-toggle">◀</span>
                </button>  
                <ul class="section-content">
                    <li><a href="post2.html">Reproductive Anatomy</a></li>
                    <li><a href="hormones.html">Reproductive Hormones</a></li>
                    <li><a href="pcos.html">PCOS</a></li>
                    <li><a href="endometriosis.html">Endometriosis</a></li>
                    <li><a href="endobelly.html">Endobelly</a></li>
                    <li><a href="cysts.html">Ovarian Cysts</a></li>
                    <li><a href="vagina.html">The Vagina</a></li> 
                    <li><a href="menopause.html">Menopause and perimenopause</a></li>
                    <li><a href="uterus.html">The Uterus</a></li>
                    <li><a href="breastcancer.html">Breast Cancer</a></li>
                    <li><a href="migraines.html">Migraines and Women</a></li>
                    <li><a href="hpv.html">Human Papillomavirus (HPV)</a></li>
                    <li><a href="lapendo.html">Laparoscopic endometrius excision surgery</a></li>
                    <li><a href="estrogen.html">Estrogen</a></li>
                    <li><a href="uti.html">Urinary Tract Infection UTI</a></li>
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
                    <li><a href="pmdd.html">Premenstrual Dysphoric Disorder (PMDD)</a></li>
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
                    <li><a href="pregsym.html">Pregnancy symptoms</a></li>
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
  
  document.getElementById('sidebar-container').innerHTML = sidebarHTML;

  // --- Search logic ---
  // Master list of all pages (title + url)
  const allPages = [
    { title: "Factors affecting fertilization", url: "post1.html" },
    { title: "Reproductive Anatomy", url: "post2.html" },
    { title: "Prenatal Vitamins", url: "post3.html" },
    { title: "Miscarriage", url: "miscarriage.html" },
    { title: "Reproductive Hormones", url: "hormones.html" },
    { title: "What is Fertility?", url: "what-is-fertility.html" },
    { title: "PCOS", url: "pcos.html" },
    { title: "IVF and Egg Freezing", url: "ivfegg.html" },
    { title: "Pregnancy Tests", url: "pregtest.html" },
    { title: "Twins", url: "twins.html" },
    { title: "IUI", url: "iui.html" },
    { title: "Blood tests", url: "bloodtests.html" },
    { title: "Letrozole", url: "letrozole.html" },
    { title: "Male infertility", url: "maleinf.html" },
    { title: "Testosterone", url: "testosterone.html" },
    { title: "Birth Control pills", url: "birthcontrolpills.html" },
    { title: "IUD", url: "iud.html" },
    { title: "Contraceptive implant - The Rod", url: "rod.html" },
    { title: "The Science of Condoms", url: "condoms.html" },
    { title: "Virginity", url: "virginity.html" },
    { title: "Pill Symptoms Scientific", url: "pillsymptoms.html" },
    { title: "Endometriosis", url: "endometriosis.html" },
    { title: "Endobelly", url: "endobelly.html" },
    { title: "Ovarian Cysts", url: "cysts.html" },
    { title: "The Vagina", url: "vagina.html" },
    { title: "Menopause and perimenopause", url: "menopause.html" },
    { title: "The Uterus", url: "uterus.html" },
    { title: "Breast Cancer", url: "breastcancer.html" },
    { title: "Migraines and Women", url: "migraines.html" },
    { title: "Human Papillomavirus (HPV)", url: "hpv.html" },
    { title: "Laparoscopic endometrius excision surgery", url: "lapendo.html" },
    { title: "Estrogen", url: "estrogen.html" },
    { title: "Urinary Tract Infection UTI", url: "uti.html" },
    { title: "Period", url: "period.html" },
    { title: "Period Cramps", url: "cramps.html" },
    { title: "Clue vs Flo", url: "cluevsflo.html" },
    { title: "Tampons", url: "tampons.html" },
    { title: "Animals That Menstruate", url: "animalperiod.html" },
    { title: "Premenstrual Dysphoric Disorder (PMDD)", url: "pmdd.html" },
    { title: "Morning Sickness", url: "morning-sickness.html" },
    { title: "Breastfeeding", url: "breastfeeding.html" },
    { title: "Pregnancy Dating", url: "ultrasoundlmp.html" },
    { title: "The Science of Blood", url: "blood.html" },
    { title: "Pregnancy dietary restrictions", url: "pregfoods.html" },
    { title: "The Science of Labor Induction Methods", url: "laborinduction.html" },
    { title: "Gender predicting & Old wives tales", url: "gender.html" },
    { title: "Chemical Pregnancy", url: "chempreg.html" },
    { title: "Infant Vaccinations", url: "vaccinebaby.html" },
    { title: "Home Births", url: "homebirths.html" },
    { title: "Pregnancy symptoms", url: "pregsym.html" },
    { title: "Fetal Growth", url: "fetalgrowth.html" },
    { title: "Gestational Diabetes", url: "gestdiab.html" },
    { title: "Molar Pregnancy", url: "molarpreg.html" },
    { title: "Preeclampsia", url: "preeclampsia.html" },
    { title: "What is Consent?", url: "what-is-consent.html" },
    { title: "The Global birth rate Decline", url: "birthratedecline.html" },
    { title: "Partner and Sexual Violence", url: "dv.html" },
  ];

  const searchInput = document.getElementById('siteSearch');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    searchResults.innerHTML = '';

    if (query.length < 2) return; // don't search until 2+ chars typed

    const matches = allPages.filter(page =>
      page.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = '<p class="no-results">No results found.</p>';
    } else {
      matches.forEach(page => {
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.title;
        searchResults.appendChild(link);
      });
    }
  });

});
