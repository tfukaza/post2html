# post2html

A better way to embed social media posts on your website.

- ⚡**Fast**: Loads nearly instantly after users visit your website
- 📱**Responsive**: Modifies the layout of the post to fit a variety of screen sizes
- 🎨**Customizable**: Provides options to customize the appearance of the post
- 🛡️**Resilient**: Maintains its appearance even if the social media post is deleted (minus images and videos)

**Try it now** 👉 [post2html.vercel.app](https://post2html.vercel.app)

Currently supports:

- X(Twitter)
- ... that's it for now 😅

## How?

Many social media post embeddings work by fetching data from their server _after_ your website has loaded, and using it to _reconstruct_ the post. This fetch & reconstruct process can be slow.

Instead, `post2html` takes a link to a social media post and generates a copy & paste-able code snippet that you can include in your website. In the process, it also allows for more customization🎨📱options than traditional embeds. The resulting code snippet contains all the data needed to display the post (minus images and videos), so it loads nearly instantly⚡after users visit your website, and can also retain its appearance even if the social media post is deleted🛡️.
