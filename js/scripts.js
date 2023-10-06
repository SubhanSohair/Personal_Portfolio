(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 71,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 80,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $("body")
      .on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val()
        );
      })
      .on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
      })
      .on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
  });
})(jQuery); // End of use strict

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
    tag = "",
    writingTag = false,
    tagOpen = false,
    typeSpeed = 100,
    tempTypeSpeed = 0;

  var type = function () {
    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      } else {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
      }
      t.innerHTML += HTML[cursorPosition];
    }
    if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = Math.random() * typeSpeed + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
    } else {
      setTimeout(reveal, 500);
    }
  };

  return {
    type: type,
  };
}

var typer = document.getElementById("typewriter");
var skipButton = document.getElementById("skipButton");
var changeTheme = document.getElementById("changeTheme");

changeTheme.addEventListener("click", () => {
  theme === "dark" ? goLight() : goDark();
});

changeThemeButton.addEventListener("click", (e) => {
  e.preventDefault();
  theme === "dark" ? goLight() : goDark();
});

skipButton.addEventListener("click", (e) => {
  e.preventDefault();
  reveal();
});

typewriter = setupTypewriter(typewriter);

var fun;
var theme = "dark";
var snd;

function myFun() {
  localStorage.getItem("nTheme") == "light"
    ? (theme = "light")
    : (theme = "dark");
  loadTheme();
  document.getElementById("loader").style.display = "block";
  typewriter.type();
}

function reveal() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

function goLight() {
  theme = "light";
  setTheme(theme);
  var rootStyle = document.querySelector(":root").style;
  rootStyle.setProperty("--navy", "#e6f1ff");
  rootStyle.setProperty("--primary", "#155084");
  rootStyle.setProperty("--lightest-slate", "#155084");
  rootStyle.setProperty("--slate", "#4ab3b4");
  rootStyle.setProperty("--burger", "#155084");
  rootStyle.setProperty("--var-highlight", "#155084");
  rootStyle.setProperty("--string-highlight", "#4ab3b4");
}

function goDark() {
  theme = "dark";
  setTheme(theme);
  var rootStyle = document.querySelector(":root").style;
  rootStyle.setProperty("--navy", "#0a192f");
  rootStyle.setProperty("--primary", "#64ffda");
  rootStyle.setProperty("--lightest-slate", "#ccd6f6");
  rootStyle.setProperty("--slate", "#8892b0");
  rootStyle.setProperty("--burger", "#1abc9c");
}

function loadTheme() {
  theme === "dark" ? goDark() : goLight();
}

function setTheme(theme) {
  if (theme == "dark") {
    localStorage.setItem("nTheme", theme);
  } else if (theme === "light") {
    localStorage.setItem("nTheme", theme);
  }
}
