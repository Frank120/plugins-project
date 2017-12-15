
// var _str = "<div id='test'>{% if test > 1 %} <div>{{ test }} </div> {% endif %} </div>"
// console.log(Handle.AnalysisString(_str));

var data = [
    {
      title: "Knockout",
      href: "http://www.cnblogs.com/TomXu/archive/2011/11/21/2257154.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_knockout2.jpg"
    },
    {
      title: "ASP.NET",
      href: "http://www.cnblogs.com/TomXu/archive/2011/11/25/2263050.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_vs.jpg"
    },
    {
      title: "HTML5",
      href: "http://www.cnblogs.com/TomXu/archive/2011/12/06/2277499.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_LearningHtml5.png"
    }
  ];


var template = document.querySelector("#template").innerHTML;
var result   = document.querySelector(".result");

// fn 01

// var i = 0,
//   len = data.length,
//   fragment = '';

//   for (; i < len; i++) {
//       fragment += template
//         .replace(/\{\{title\}\}/, data[i].title)
//         .replace(/\{\{href\}\}/, data[i].href)
//         .replace(/\{\{imgSrc\}\}/, data[i].imgSrc);
//   }

//   result.innerHTML = fragment;

result.innerHTML = Handle.attachTemplateToData(template, data);