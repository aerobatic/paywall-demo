# aerobatic-paywall-demo

Aerobatic demo site showing how to use the [paywall plugin](https://www.aerobatic.com/docs/plugins/paywall) to power a paid membership site built with [Jekyll](https://jekyllrb.com).

Try the live version of this demo at: [https://paywall-demo.aerobaticapp.com](https://paywall-demo.aerobaticapp.com)

To make the integration as easy as possible, the demo makes use of the [paywall.js](https://github.com/aerobatic/js-libs) drop-in script which abstracts away the client-side plumbing using `data-paywall-*` attributes. However it's also straightforward to wire it up as part of your own client JavaScript if you choose. The [source code](https://github.com/aerobatic/js-libs/blob/master/libs/paywall.js) of the drop-in script can serve as a guide.
