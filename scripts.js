document.addEventListener('DOMContentLoaded', function() {
  transparentHeader();
  createGrid();
  createSlider();
  createAccordion();
  mobileMenu();
  swipeHandler();
  fillAside();
  showAside();
});

function createGrid() {
  const container = document.getElementById('grid-container');
  const images = [
    'resources/grid/IOS.png',
    'resources/grid/react.png',
    'resources/grid/python_a.png',
    'resources/grid/python_b.png',
    'resources/grid/cybersecurity.png',
    'resources/grid/TOT.png',
    'resources/grid/blockchain.png',
    'resources/grid/devops.png',
    'resources/grid/ISG.png'
  ];
  const links = [
    'https://www.tbcacademy.ge/usaid/ios-development',
    'https://www.tbcacademy.ge/usaid/react',
    'https://www.tbcacademy.ge/usaid/python-basic',
    'https://www.tbcacademy.ge/usaid/python-advance',
    'https://www.tbcacademy.ge/usaid/information-security-advance',
    'https://www.tbcacademy.ge/usaid/training-of-trainers',
    'https://www.tbcacademy.ge/usaid/blockchain',
    'https://www.tbcacademy.ge/usaid/devops',
    'https://www.tbcacademy.ge/usaid/information-security-basic'
  ];
  const names = [
    'iOS Development',
    'React',
    'Intro to Python',
    'Advanced Python',
    'Advanced Cybersecurity Course',
    'ToT - Training of Trainers',
    'Blockchain',
    'DevOps',
    'Information Security Governance'
  ];
  const states = [
    'მიმდინარეობს რეგისტრაცია',
    'რეგისტრაცია დასრულებულია'
  ];
  for (let i = 0; i < images.length; i++) {
    const gridItem = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('h4');
    const state = document.createElement('p');
    const link = document.createElement('a');
    gridItem.className = 'grid-item';
    image.className = 'grid-img';
    name.className = 'grid-name';
    state.className = 'grid-state';
    link.className = 'grid-link';
    image.src = images[i];
    image.alt = names[i];
    name.textContent = names[i];
    state.textContent = states[1];
    link.href = links[i];
    link.textContent = 'კურსის დეტალები'
    container.appendChild(gridItem);
    gridItem.appendChild(image);
    gridItem.appendChild(name);
    gridItem.appendChild(state);
    gridItem.appendChild(link);
  }
}

function createSlider() {
  let slides;
  const sliderContainer = document.querySelector('.slider-container');
  const arrows = document.querySelectorAll('.arrow');
  const dots = document.querySelectorAll('#slider-buttons li');
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let intervalId;
  const slideContent = [
    ['resources/partners/USAID.png', 'resources/partners/space.png', 'resources/partners/tinet.png'],
    ['resources/partners/tegeta.png', 'resources/partners/spectre.png', 'resources/partners/leasing.png'],
    ['resources/partners/UFC.png']
  ];
  function createSlide(content) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    content.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'Slide Image';
      slide.appendChild(img);
    });
    return slide;
  }
  function initializeSlider() {
    slides = slideContent.map(content => createSlide(content));
    slides.forEach((slide, index) => {
      slide.style.opacity = index === 0 ? 1 : 0;
      sliderContainer.appendChild(slide);
    });
    updateSlide();
  }
  function updateSlide() {
    slides.forEach((slide, index) => {
      slide.style.opacity = index === currentSlide ? 1 : 0;
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideContent.length;
    updateSlide();
    resetInterval();
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideContent.length) % slideContent.length;
    updateSlide();
    resetInterval();
  }
  function dotClick(index) {
    currentSlide = index;
    updateSlide();
    resetInterval();
  }
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
  }
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
    }
  }
  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 3000);
  }
  arrows.forEach(arrow => {
    arrow.addEventListener('click', arrow === arrows[0] ? prevSlide : nextSlide);
  });
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => dotClick(index));
  });
  sliderContainer.addEventListener('touchstart', handleTouchStart);
  sliderContainer.addEventListener('touchend', handleTouchEnd);
  resetInterval();
  initializeSlider();
}

function createAccordion() {
  const accordionContainer = document.getElementById("accordion-container");
  const accordionData = [
    {
      question: "როგორ ხდება კურსებზე რეგისტრაცია და შერჩევა?",
      answer: "კურსზე რეგისტრაციისთვის უნდა გაიარო რამდენიმე ეტაპი:</p>\
        <p id='steps'><b>I ეტაპი</b> - პირველ ეტაპზე საჭიროა, შეავსო სასურველი კურსისთვის განკუთვნილი სარეგისტრაციო ფორმა, რომელიც განთავსებულია კურსის შიდა გვერდზე. \
        კურსზე რეგისტრაციის დასრულების შემდეგ დაიწყება შემოსული განცხადებების გადარჩევა.<br>\
        <b>II ეტაპი</b> - შერჩევის მეორე ეტაპი კურსების მიხედვით განსხვავებულია, ზოგიერთი კურსისთვის მოიცავს პრე-ტესტს, ზოგიერთ კურსზე კი უნარების ტესტს, \
        სადაც მინიმალური ზღვარის გადალახვის შემთხვევაში გადახვალ შერჩევის შემდეგ ეტაპზე.<br>\
        <b>III ეტაპი</b> - მესამე ეტაპი კურსების მიხედვით განსხვავდება: Advance კურსებზე, სადაც მოითხოვება გარკვეული ტექნიკური ცოდნა, მონაწილეებმა უნდა დაწერონ \
        ტექნიკური ტესტი ცოდნის დონის შესამოწმებლად, ხოლო კურსებზე, სადაც რაიმე ტიპის წინასწარი ცოდნა მოთხოვნილი არ არის უნდა შეასრულოთ ტექნიკური დავალება, \
        რაც თქვენი კვლევისა და თვითსწავლის უნარს ამოწმებს.<br>\
        <b>IV ეტაპი</b> - შერჩევის ბოლო მეოთხე ეტაპი მოიცავს გასაუბრებას შესარჩევ კომისიასთან. გასაუბრების წარმატებით გავლის შემთხვევაში \
        ჩაირიცხებით კურსზე და გაფორმდება შესაბამისი ხელშეკრულება.</p>\
        <p>* სანამ კურსზე დარეგისტრირდები მნიშვნელოვანია, ყურადღებით წაიკითხო კურსის აღწერა, ნახო რას ისწავლი კურსის განმავლობაში და გაიგო გააჩნია თუ არა კურსს დასწრების წინაპირობა.",
    },
    {
      question: "შემიძლია თუ არა ერთზე მეტ კურსზე რეგისტრაცია?",
      answer: "TBC X USAID ტექნოლოგიური განათლებისთვის პროგრამაში თითოეულ კანდიდატს\
        აქვს მხოლოდ ერთი კურსის გავლის შესაძლებლობა. გარდა Information Security და Python\
        კურსებისა, სადაც Basic დონის გავლის შემდეგ შესაძლებელია სწავლის გაგრძელება Advance დონეზე.",
    },
    {
      question: "რა ღირს სწავლა პროგრამის ფარგლებში?",
      answer: "პროგრამის ფარგლებში კურსებზე სწავლა სრულიად დაფინანსებულია თიბისი ბანკისა და USAID-ის მიერ.",
    },
  ];
  accordionData.forEach((item) => {
    const button = document.createElement("button");
    const panel = document.createElement("div");
    button.className = "accordion";
    panel.className = "panel";
    button.textContent = item.question;
    panel.innerHTML = `<p>${item.answer}</p>`;
    button.addEventListener("click", function () {
      const allButtons = document.querySelectorAll(".accordion");
      const allPanels = document.querySelectorAll(".panel");
      allPanels.forEach((otherPanel, otherIndex) => {
        const otherButton = allButtons[otherIndex];
        if (otherPanel !== panel) {
          otherPanel.style.maxHeight = null;
          otherButton.classList.remove("accordion-active");
        }
      });
      button.classList.toggle("accordion-active");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
    accordionContainer.appendChild(button);
    accordionContainer.appendChild(panel);
  });
};

function transparentHeader() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("transparent-header");
    } else {
      header.classList.remove("transparent-header");
    }
  });
};

function mobileMenu() {
  const menu = document.getElementById("menu-burger");
  const burger = document.getElementById("menu-burger");
  const nav = document.querySelector("nav");
  const body = document.body;
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  body.appendChild(overlay);

  menu.addEventListener("click", function () {
    burger.classList.toggle("open");
    const computedRight = window.getComputedStyle(nav).right;

    if (computedRight === "0px" || computedRight === "0") {
      nav.style.right = "-250px";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
      overlay.style.pointerEvents = "none";
      body.classList.remove("no-scroll");
      setTimeout(function () {
        overlay.style.visibility = "hidden";
      }, 300);
    } else {
      nav.style.right = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.pointerEvents = "auto";
      body.classList.add("no-scroll");
      overlay.style.visibility = "visible";
    }
  });
}

function mobileMenu() {
  const menu = document.getElementById("menu-burger");
  const burger = document.getElementById("menu-burger");
  const nav = document.querySelector("nav");
  const body = document.body;
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    body.appendChild(overlay);
  }
  let isButtonDisabled = false;
  menu.addEventListener("click", function () {
    if (isButtonDisabled) {
      return;
    }
    isButtonDisabled = true;
    setTimeout(function () {
      isButtonDisabled = false;
    }, 300);
    burger.classList.toggle("open");
    const computedRight = window.getComputedStyle(nav).right;
    if (computedRight === "0px" || computedRight === "0") {
      nav.style.right = "-250px";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
      overlay.style.pointerEvents = "none";
      body.classList.remove("no-scroll");
      setTimeout(function () {
        overlay.style.display = "none";
      }, 300);
    } else {
      nav.style.right = "0";
      overlay.style.pointerEvents = "auto";
      body.classList.add("no-scroll");
      setTimeout(function () {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }, 1);
      overlay.style.display = "block";
    }
  });
}

function swipeHandler() {
  let prevScrollPos = window.scrollY;
  window.onscroll = function() {
    const maxScreenWidth = 425;
    if (window.innerWidth <= maxScreenWidth) {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > 84) {
        if (prevScrollPos > currentScrollPos) {
          document.getElementById("header").style.top = "0";
        } else {
          document.getElementById("header").style.top = "-84px";
        }
      } else {
        document.getElementById("header").style.top = "0";
      }
      prevScrollPos = currentScrollPos;
    }
  };
}

function fillAside() {
  const asideData = [
    {
      heading: "წესები და პირობები",
      paragraph: "წინამდებარე ვებ-გვერდის გამოყენება რეგულირდება სს „თიბისი ბანკის“ (საიდენტიფიკაციო ნომერი: 204854595, მისამართი: თბილისი, კ. მარჯანიშვილის ქ. #7) მიერ დადგენილი წესებითა და პირობებით.</p>\
      <p>ტერმინები „ბანკი“, „ჩვენ“ გულისხმობს სს „თიბისი ბანკს“ (ასევე მისი ჯგუფის წევრ მონათესავე, შვილობილ, აფილირებულ კომპანიებს), ხოლო ტერმინი „თქვენ“, „მომხმარებელი“ გულისხმობს ინდივიდს, კომპანიას, ორგანიზაციულ წარმონაქმნს, რომელიც იყენებს ბანკის წინამდებარე ვებ-გვერდს.</p>\
      <p>გთხოვთ, ყურადღებით გაეცნოთ წინამდებარე წესებსა და პირობებს, რომელიც არეგულირებს თქვენ მიერ ვებ-გვერდის გამოყენების პირობებს. იმ შემთხვევაში, თუ არ ეთანხმებით წინამდებარე წესებსა და პირობებს, გთხოვთ, დატოვოთ ბანკის ვებ-გვერდი.</p>\
      <p>ვებ-გვერდზე სტუმრობით, ან მასზე გამოქვეყნებული ინფორმაციის გამოყენებით, ადასტურებთ და სრულად ეთანხმებით მითითებულ ყველა დანაწესს, რომელიც შესაძლოა ცალმხრივად შეიცვალოს სს „თიბისი ბანკის“ მიერ გარკვეული პერიოდულობით, რაც დაფიქსირდება მოცემულ ვებ-გვერდზე და მასზე თქვენი სტუმრობა ნიშნავს  შესაბამის პირობებზე დათანხმებას.</p>\
      <p>ბანკის ვებ-გვერდზე მითითებული ინფორმაცია, უმეტეს შემთხვევაში, განკუთვნილია იმ პირებისთვის, რომლებიც დაინტერესებულნი არიან საქართველოს ფინანსურ ბაზარზე მომსახურების მიღებით. შესაძლოა, ვებ-გვერდზე მითითებული ინფორმაცია არ იყოს ხელმისაწვდომი მსოფლიოს ყველა გეოგრაფიულ არეალში, ბანკის გადაწყვეტილების შესაბამისად.</p>\
      <p>ბანკის ვებ-გვერდზე მითითებული გარკვეული ინფორმაციის გასაანალიზებლად, შესაძლოა დაგჭირდეთ შესაბამისი სფეროს სპეციალისტის კონსულტაცია.</p>\
      <p>ბანკის ვებ-გვერდზე მითითებული კონკრეტული პროდუქტები/მომსახურება რეგულირდება სპეციალური საბანკო მომსახურების ხელშეკრულებით.",
    },
    {
      heading: "ინფორმაციის სიზუსტე",
      paragraph: "ბანკი არ არის პასუხისმგებელი ვებ-გვერდზე მითითებული ინფორმაციის შინაარსის სიზუსტეზე, მიუხედავად ჩვენი დიდი ძალისხმევისა მოგაწოდოთ უტყუარი ინფორმაცია. აღნიშნული არ წარმოადგენს დადასტურებას და გარანტიას, რომ ვებ-გვერდზე მითითებული ინფორმაცია არის ზუსტი, უტყუარი და შესაფერისი მისი ნებისმიერი გამოყენებისთვის. ბანკის ვებ-გვერდზე არსებული ნებისმიერი ინფორმაცია მითითებულია  „როგორც არის“ (“As Is”) საწყისზე. შესაბამისად, ვებ-გვერდზე არსებული ნებისმიერი ინფორმაციის გამოყენება სრულად წარმოადგენს მომხმარებლის პირად რისკს და ბანკი არ არის პასუხისმგებელი ვებ-გვერდზე გამოქვეყნებული ინფორმაციის გამოყენებით დამდგარ ზიანზე. წინამდებარე დათქმა არ ეხება სს თიბისი ბანკის ვებ-გვერდზე <a href='https://www.tbcbank.ge'>www.tbcbank.ge</a> განთავსებული ხელშეკრულების შემადგენელ ნაწილებს.</p>\
      <p>ვებ-გვერდზე არსებული ინფორმაცია არ წარმოადგენს დაპირებას მომსახურებაზე/პროდუქტზე ან რაიმე სახის სახელშეკრულებო ურთიერთობით ბანკის შებოჭვის საფუძველს.",  
    },
    {
      heading: "პასუხისმგებლობის შეზღუდვა",
      paragraph: "ბანკი და მისი შესაბამისი თანამშრომლები არ არიან პასუხისმგებელნი დამდგარი შედეგისათვის, რომელიც მოიცავს პირდაპირ, არაპირდაპირ, სპეციალურ, შემთხვევით, მიზეზ-შედეგობრივ, არასახელშეკრულებო ზიანს, რაც გამოწვეულია ვებ-გვერდზე მითითებული ინფორმაციის გამოყენებით.</p>\
      <p>ბანკი არ აგებს პასუხს ვებ-გვერდის გამოყენებით გამოწვეულ რაიმე სახის ზიანზე, დანაკარგზე, თუნდაც  ტექნიკური შეფერხების, დეფექტის, ოპერაციის გაუქმება/შეჩერების, კომპიუტერული ვირუსის, ან სისტემის გაუმართაობის შემთხვევაში.</p>\
      <p>ვებ-გვერდზე წარმოდგენილი შინაარსის ხელმისაწვდომობა შესაძლოა დამოკიდებული იყოს საძიებო სისტემის ფუნქციებსა და შეზღუდვებზე. ბანკი არ იღებს პასუხისმგებლობას იმ შემთხვევებზე, თუ ვებ-გვერდის შემადგენელი გარკვეული კომპონენტები ხელმიუწვდომელია თქვენთვის.",
    },
    {
      heading: "ვებ-გვერდის გამოყენება",
      paragraph: "ვებ-გვერდზე მითითებული ინფორმაცია განკუთვნილია მხოლოდ მომხმარებლების პირადი გამოყენებისთვის. თქვენ ვალდებული ხართ, ვებ-გვერდზე განთავსებული ინფორმაცია, ასევე ვებ-გვერდის სტრუქტურა, გამოსახულება და დიაზინი არ გაავრცელოთ, არ გადასცეთ, არ მოახდინოთ მისი ასლების დამზადება ან/და რეპროდუცირება (მათ შორის სოციალურ მედიაში) კომერციული მიზნებისთვის, ბანკის წინასწარი წერილობითი თანხმობის გარეშე, რაც ჩვენს ერთპიროვნულ დისკრეციას წარმოადგენს. ბანკის წინასწარი წერილობითი თანხმობა არ არის საჭირო, თუ ვებ-გვერდზე მითითებული ინფორმაციის/შინაარსის გამოყენება ხდება ბანკის წინასწარ განცხადებული თანხმობის შესაბამისად, ან ასეთი ინფორმაცია გამოიყენება პირადი მოხმარებისთვის, საგანმანათლებლო ან ინფორმაციული მიზნებისთვის.</p>\
      <p>ვებ-გვერდისა და სისტემის არაავტორიზებული გამოყენება (მათ შორის არარსებული დასახელებით და კოდით) სასტიკად აკრძალულია. იქ, სადაც მოითხოვება რეგისტრაცია და პაროლის გამოყენება, თქვენ ვალდებული ხართ, კონფიდენციალურად შეინახოთ და არ დაუშვათ მესამე პირის მიერ ვებ-გვერდზე წვდომის შესაძლებლობა თქვენ მაგივრად. რეგისტრაციისა და პაროლის გამოყენების დროს, თქვენ აცნობიერებთ და ეთანხმებით, რომ ბანკმა შესაძლოა მოახდინოს რეგისტრაციისა და პაროლის დეაქტივაცია და აღნიშნული ქმედებით შეზღუდოს ვებ-გვერდზე წვდომა იმ შემთხვევაში, თუ თქვენი მხრიდან ადგილი აქვს წესებისა და პირობების დარღვევას.</p>\
      <p>შესაძლებელია, რომ ვებ-გვერდის რომელიმე კონკრეტული გვერდი შეიცავდეს წინამდებარე წესებისაგან და პირობებისაგან განსხვავებულ დანაწესებს. მათ შორის კოლიზიის არსებობის შემთხვევაში, უპირატესობა ენიჭება წინამდებარე დანაწესებს.</p>\
      <p>ბანკის ვებ-გვერდის (მათ შორის ფორუმების) გამოყენებისას, აკრძალული გაქვთ უკანონო/თაღლითური ქმედება, ცილისმწამებლური, სიძულვილის ენით საუბარი, ან სხვა არასასურველი ინფორმაციის განთავსება, გავრცელება/ტრანსმისია, რაც შესაძლოა არღვევდეს მოქმედ კანონმდებლობას და რეგულაციას, ან ზიანს აყენებდეს ბანკის საქმიან რეპუტაციას. ასევე გეკრძალებათ ვებ-გვერდისთვის ზიანის მიყენება ნებისმიერი სახის მავნე პროგრამის მეშვეობით („ტროას ცხენი,“ „ლოგიკური ბომბი“ ან სხვა მსგავსი ქმედებების განხორციელება).</p>\
      <p>თქვენს ერთპიროვნულ რისკს წარმოადგენს ვებ-გვერდზე მოსახვედრად გამოყენებული ნებისმიერი პროგრამული მოდულის (სატელეფონო, კომპიუტერული და სხვა) გაუმართაობა.</p>\
      <p>იმ შემთხვევაში, თუ ვებ-გვერდზე წვდომა შეუძლებელი გახდება ბანკის ტექნიკური შეფერხების, ან ბანკისაგან დამოუკიდებელი სხვა ნებისმიერი მიზეზით, ბანკი არ არის პასუხისმგებელი დამდგარ შედეგზე.",
    },
    {
      heading: "ინტელექტუალური საკუთრება",
      paragraph: "ვებ-გვერდზე, მის შინაარსზე, სტრუქტურასა და დიზაინზე სრულად ვრცელდება სს „თიბისი ბანკის“ საავტორო უფლება.  სს „თიბისი ბანკის“ ექსკლუზიური უფლებები ვრცელდება ასევე ბანკის მიერ შექმნილ და რეგისტრირებულ ინტელექტუალური საკუთრების ნებისმიერ ობიექტზე, მათ შორის მის კუთვნილ სასაქონლო ნიშნებზე.</p>\
      <p>ბანკის საავტორო (©) და სხვა ინტელექტუალური საკუთრების უფლებები ვრცელდება წინამდებარე ვებ-გვერდსა და მასზე არსებულ მთელ შინაარსზე (პროდუქტებისა და მომსახურების ჩათვლით).</p>\
      <p>აკრძალულია წინამდებარე ვებ-გვერდზე მითითებული ნებისმიერი ინფორმაციის/შინაარსის, მათ შორის ლოგო, პიქტოგრამა, გრაფიკა, სურათი, გამოსახულება, პატენტი, მომსახურების/სასაქონლო ნიშნები, დიზაინი,  ბანკის მიერ შექმნილი ვიზუალური მედია და სხვა ინტელექტუალური საკუთრების (რეგისტრირებული, ან არარეგისტრირებული) უნებართვო გამოყენება, დამუშავება და გამოქვეყნება (მათ შორის სოციალურ მედიაში)  ბანკის წინასწარი წერილობითი თანხმობის გარეშე. ბანკის თანხმობა არ არის საჭირო, თუ წინამდებარე მონაცემების გამოყენება ხორციელდება არაკომერციული, პირადი მიზნებისთვის და იმ შემთხვევებში, როცა წინასწარ თანხმობას არ ითვალიწინებს საქართველოს კანონმდებლობა, ან შესაბამისი საერთაშორისო რეგულაცია.</p>\
      <p>ინტელექტუალური საკუთრების ვებ-გვერდზე მითითება არ ნიშნავს  მომხმარებლისათვის მის გამოყენებაზე ლიცენზიის მინიჭებას. ვებ-გვერდიდან მომხმარებლის მიერ ნებისმიერი ინფორმაციის კომერციული მიზნებისთვის გადმოწერა,ან ასლის დამზადება ჩაითვლება საქართველოს კანონმდებლობის დარღვევად.</p>\
      <p>წესებსა და პირობებში მითითებული არცერთი დანაწესი არ განიჭებთ უფლებას, ან ლიცენზიას წინამდებარე მუხლში ჩამოთვლილი ბანკის ინტელექტუალური საკუთრების გამოყენებაზე.</p>\
      <p>იმ შემთხვევაში, თუ ვებ-გვერდი მომხმარებლებს ანიჭებს ჩატის, ინტერაქციისა, თუ დიალოგის/დისკუსიის გამართვის შესაძლებლობას, ვალდებულნი ხართ, წინამდებარე არხებში დააფიქსიროთ მხოლოდ ის ინფორმაცია, რომელზეც ფლობთ ინტელექტუალურ საკუთრებას, ან გაქვთ შესაბამისი პირის თანხმობა. ამასთან ერთად, ბანკს ანიჭებთ უფლებას დაამუშაოს (მათ შორის, გამოაქვეყნოს) თქვენ მიერ დაფიქსირებული ინფორმაცია კანონიერი, საკომუნიკაციო/საინფორმაციო მიზნებისათვის.</p>\
      <p>ბანკის ჯგუფის წევრი კომპანიები შესაძლოა იყენებდნენ ბანკის სასაქონლო ნიშანს, დასახელებას და ლოგოტიპს, რომელიც წარმოადგენს ბანკის საკუთრებას. ლაჟვარდის ფერი არის ბანკის კუთვნილი სასაქონლო ნიშნის შემადგენელი ნაწილი, რომელიც რეგისტრირებულია დადგენილი წესით.</p>\
      <p>ბანკის ვებ-გვერდზე მითითებული კომპანიების სახელები, სასაქონლო ნიშნები, ლოგოები ეკუთვნის შესაბამის პირებს.",
    },
    {
      heading: "კონფიდენციალურობის დაცვა",
      paragraph: "სს „თიბისი ბანკი“ უზრუნველყოფს მისთვის მიწოდებულ კონფიდენციალური ინფორმაციის მაქსიმალურ დაცულობას კანონმდებლობით დადგენილი წესით.</p>\
      <p>ბანკი მომხმარებლის პერსონალურ ინფორმაციას ითხოვს საჭიროებიდან გამომდინარე, იმ მოცულობით, რაც საჭიროა ეფექტური მომსახურების  გასაწევად საქართველოს კანონმდებლობით დადგენილი წესით. მომხმარებელს ნებისმიერ დროს შეუძლია მოითხოვოს ინფორმაცია ბანკისგან მისი პერსონალური ინფორმაციის დამუშავების თაობაზე.</p>\
      <p>ვებ-გვერდზე თქვენი პერსონალური ინფორმაციის მითითებით, ბანკს ანიჭებთ უფლებას, დაამუშავოს და მარკეტინგული მიზნებისთვის გამოიყენოს თქვენ მიერ დაფიქსირებული ინფორმაცია.</p>\
      <p>ბანკის მხრიდან კონფიდენციალური ინფორმაციის გადაცემა ხორციელდება თქვენი წინასწარი თანხმობით, ან კანონით გათვალისწინებულ სხვა შემთხვევებში.</p>\
      <p>ბანკი მაქსიმალურად ზრუნავს თქვენი პირადი კონფიდენციალური ინფორმაციის უსაფრთხოებასა და გაუმჟღავნებლობაზე, მაგრამ იმ ფაქტის გათვალისწინებით, რომ თქვენი მონაცემების დისტანციურად მოწოდების პროცესი არ არის დაშიფრული, ბანკი იხსნის პასუხისმგებლობას მესამე პირების მიერ თქვენი მონაცემების არასანქცირებულ წვდომაზე ამ მონაცემების ბანკისთვის მიწოდების დროს.</p>\
      <p>ბანკი მაქსიმალურად ზრუნავს თქვენი პირადი ინფორმაციის უსაფრთხოებასა და კონფიდენციალურობაზე, თუმცა იხსნის პასუხისმგებლობას მესამე პირების მიერ აღნიშნული ინფორმაციის არასანქცირებულ წვდომაზე ამ მონაცემების ბანკისთვის მიწოდების დროს (მათ შორის დისტანციური მიწოდებისას გამოყენებულ პლატფორმებზე?)</p>\
      <p>კონფიდენციალური ინფორმაციის ბანკისთვის მიწოდების დროს, მომხმარებელი ვალდებულია, არ მოახდინოს ისეთი ავტომატური საშუალებების გამოყენება, რამაც შესაძლოა საფრთხე შეუქმნას ბანკის უსაფრთხოებასა და დაცულობას.</p>\
      <p>ვებ-გვერდის სტუმრობისას, თქვენ მიერ დატოვებული ნებისმიერი „ელექტრონული ნაკვალევი“, შესაძლოა გამოყენებულ იქნას ბანკისთვის დამახასიათებელი ტექნიკური ოპერაციების განსახორციელებლად, სტატისტიკის საწარმოებლად, ან საიტის ხარისხის გასაუმჯობესებლად.</p>\
      <p>ბანკის მიერ ადმინისტრაციული ფუნქციების ეფექტურად შესასრულებლად, შესაძლოა თქვენ მიერ გამოგზავნილ იქნას პერსონალური მონაცემები ბანკის ელექტრონულ ფოსტაზე. გაცნობებთ, რომ ბანკი არ არის პასუხისმგებელი, გადაცემის პროცესში, მესამე პირის არასანქცირებული ჩარევის შედეგად, აღნიშნული ინფორმაციის უკანონო მოპოვებაზე, ან იმ ინფორმაციაზე, რომელიც მომხმარებელმა თავადვე გახადა საჯარო, ან გაავრცელა ნაკლებად უსაფრთხო ელექტრონული საშუალებებით.</p>\
      <p>წინამდებარე წესებსა და პირობებზე დათანხმებით, მომხმარებელი ადასტურებს ბანკისთვის მინიჭებულ უფლებას, ბანკი დაუკავშირდეს ან/და გაუგზავნოს მომხმარებელს შეტყობინება (მათ შორის, ელექტრონული ფორმით: მოკლე ტექსტური შეტყობინება, ელექტრონული ფოსტა) ვებ-გვერდზე მითითებული პროდუქტისა, თუ მომსახურების თაობაზე.",  
    },
    {
      heading: "ვებ-გვერდზე მითითებული ბმულები",
      paragraph: "ბანკი უფლებამოსილია ვებ-გვერდზე მიუთითოს ჰიპერბმულები, მესამე პირის მფლობელობაში არსებული ვებ-გვერდების ბმულები, თქვენივე ინფორმირებულობის უზრუნველსაყოფად.</p>\
      <p>მესამე პირის მფლობელობაში არსებული ბმულები და მათზე მითითებული ინფორმაცია, არ ექვემდებარება ბანკის კონტროლს, ხოლო მათზე მოცემული პროდუქტებისა და შინაარსის სიზუსტე არ წარმოადგენს ბანკის პასუხისმგებლობის საგანს. შესაბამისად, თქვენ ხართ პასუხისმგებელი მესამე პირების რესურსებზე/ვებ-გვერდზე არსებული წესებისა და პირობების გაცნობაზე.",
    },
    {
      heading: "ცვლილების განხორციელება",
      paragraph: "ბანკი უფლებამოსილია ცვლილება შეიტანოს წინამდებარე წესებსა და პირობებში მომხმარებელთათვის წინასწარი შეტყობინების გარეშე.</p>\
      <p>მომხმარებელი პასუხისმგებელია რეგულარულად გაეცნოს წინამდებარე წესებსა და პირობებს. თქვენ მიერ ვებ-გვერდზე სტუმრობა/მითითებული ინფორმაციის გამოყენება ავტომატურად ნიშნავს თქვენს დათანხმებას წინამდებარე წესებისა და პირობების მოთხოვნებზე.",
    },
    {
      heading: "მარეგულირებელი სამართალი და იურისდიქცია",
      paragraph: "წინამდებარე წესები და პირობები რეგულირდება საქართველოს კანონმდებლობით.</p>\
      <p>დავის წარმოშობის შემთხვევაში, საქმეს განიხილავს საქართველოს საერთო სასამართლოების სისტემა კანონმდებლობით დადგენილი წესით.</p>\
      <p>წინამდებარე დანაწესების კონკრეტული ჩანაწერის ბათილობა არ იწვევს წესებისა და პირობების სხვა დათქმების ბათილობას",
    },
    {
      heading: "საკონტაქტო ინფორმაცია",
      paragraph: "ნებისმიერი კითხვის არსებობის შემთხვევაში, რაც უკავშირდება წინამდებარე წესებსა და პირობებს და ვებ-გვერდზე მითითებულ ინფორმაციას,  გთხოვთ, მოგვმართოთ წერილობითი სახით მისამართზე: თბილისიი, ატენის ქ. 2 ან მოგვწეროთ ელექტრონული ფოსტის საშუალებით: <a href='mailto:itacademy@tbcbank.com.ge'>itacademy@tbcbank.com.ge</a>,</p>\
      <p>“სს „თიბისი ბანკის“ მომსახურებით სარგებლობისას მომხმარებელთა დაცვის, კიბერუსაფრთოებისა და კონფიდენციალურობის დაცვის პრინციპები ხელმისაწვდომია ვებ-გვერდზე <a href='https://www.tbcbank.ge'>www.tbcbank.ge</a>”",
    },
  ]
  const aside = document.querySelector('aside');
  const svg = document.createElement('button');
  const close = document.createElement('button');
  svg.id = "cross-button";
  close.id = "close-button";
  svg.className = "close-button";
  close.className = "close-button";
  close.textContent = 'დახურვა';
  aside.appendChild(svg);
  i = 0
  asideData.forEach((item) => {
    const headerElement = document.createElement('h4');
    const paragraphElement = document.createElement('div');
    headerElement.className = "headers";
    headerElement.id = "header-" + i;
    paragraphElement.className = "paragraphs";
    headerElement.textContent = item.heading;
    paragraphElement.innerHTML = `<p>${item.paragraph}</p>`;
    aside.appendChild(headerElement);
    aside.appendChild(paragraphElement);
    i += 1;
  });
  aside.appendChild(close);
}

function showAside() {
  const asideButton = document.getElementById('aside-button');
  const closeButtons = document.querySelectorAll('.close-button');
  const termsAside = document.getElementById('terms');
  const body = document.body;
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    body.appendChild(overlay);
  }
  asideButton.addEventListener("click", function () {
    toggleAside();
  });
  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      toggleAside();
    });
  });
  function toggleAside() {
    const computedRight = window.getComputedStyle(termsAside).right;
    const screenWidth = window.innerWidth;
    if (computedRight === "0px" || computedRight === "0") {
      if (screenWidth < 768) {
        termsAside.style.right = "-70%";
      } else {
        termsAside.style.right = "-37%";
      }
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
      overlay.style.pointerEvents = "none";
      body.classList.remove("no-scroll");
      setTimeout(function () {
        overlay.style.display = "none";
      }, 300);
    } else {
      termsAside.style.right = "0";
      overlay.style.pointerEvents = "auto";
      body.classList.add("no-scroll");
      setTimeout(function () {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }, 1);
      overlay.style.display = "block";
    }
  }
}
