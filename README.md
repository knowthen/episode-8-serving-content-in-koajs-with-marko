In this episode we'll look at [Marko](https://github.com/raptorjs/marko "Marko") a relatively **new** and **fast** **templating engine** available in Node.js and in the browser.

There are over _two dozens_ choices in templating engines _available_ in _node.js_, and _figuring_ out _which_ one to _use_ can be quite the _burden_.

Here is my advice, **you must consider Marko!**

I believe that I can **prove why** Marko is so great within the _first_ **2 minutes** of this **screencast**.

Marko has several **killer features** that set it apart:

*   Marko offers **streamed** template **rendering**, which **sends** your html **content** to the browser **early** and **often**.
*   Marko supports **asynchronous rendering** of html **fragments**, which basically means you define sections of your template as asynchronous and you _let Marko_ _handle_ the _waiting_, _buffering_ and eventual _rendering_.
*   Marko offers **out of order rendering** while still displaying the html content in _correct order_. This means that as soon as your asynchronous _queries_ _complete_, Marko will _render_ the relevant portions of the template and _send_ it _to_ the _browser_, even if this means sending the content out of the final display sequence. Then Marko displays the content in the correct sequence by using client side JavaScript.
These three **features** in combination **result** in **huge gains** in **perceived** and **actual** loading **performance** particularly when used on multi-page web applications that serves dynamic content.

The **reason** for the significant performance gains is because Marko is **designed** to **leverage Progressive Rendering** in the browser, a feature supported by all modern browsers.

The idea behind Progressive Rendering is that the **browser** should attempt to **paint** or render as much of the **page** as can as **early** as possible.

You should really **watch** to **demo** to get a **sense** of **why** _Progressive Rendering_ and **Marko** are so **important**.

Please join my mailing list so I can let you know when new screencasts are released

http://knowthen.com/join/

