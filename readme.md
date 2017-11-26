### About
This site was made as a front end code test for a job interview process, during the week of 11/19/2017.

In 2014, I wrote a new very short story every day for a month, then recorded myself reading them online. This site allows users to browse through various playlists of these videos on Youtube.

### Dependencies
All dependencies of the site are loaded through a CDN. Since the site is reliant on videos hosted on Youtube, it will only work online, even if the dependencies were local. I used CDNs likely to already be cached on some users' computers, to help reduce typical load times.

This project depends on:
* Jquery 3.2.1
* Bootstrap v4.0.0 Beta
* Fontawesome

### Design Notes
I wanted the page to be as simple and intuitive as possible, and focus on making a small number of components stable and fun. Because this site is being evaluated as a test of front-end skill only, the form does not submit data anywhere (though it does validate inputs). Everything else on the page is fully functional.

I started with one panel open and one closed in part to make the toggle mechanic more obvious without providing explicit textual description. This is probably my biggest concern with the design - I believe all other controls to be pretty intuitive.

### Technical Notes
If I extend this project (for example, by adding a toggling panel which shows the text of the story being read, or by showing the title and day under the current playing video), I will probably refactor the project to use Knockout rather than only Jquery. I think that Jquery was sensible in this case because there were no relevant computed properties, and most strings only appeared once (for example, titles of videos only appear in the video select dropdown, and in the title which shows in the Youtube iFrame automatically).

I used the Bootstrap 4 Beta for two reasons:

1. Unlike Bootstrap 3, it handles video resizing without awkward and artificial CSS margin tricks.
2. Whenever I am given free reign to make a new project, I like using at least one tool I haven't used before.

Having used it, I consider it an improvement over Bootstrap 3 and hope it comes into more wide use once it leaves beta.

This site has been tested on recent versions of Internet Explorer, Chrome, Firefox, and Safari (on an iPad).

### Hosting
This site is hosted at www.justisdevanmills.com/flashfictionmonth. The code is also hosted on my Github account, at https://github.com/Lompta.
