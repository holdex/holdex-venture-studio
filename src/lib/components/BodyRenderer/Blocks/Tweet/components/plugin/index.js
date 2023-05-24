export default class Twitter {

    constructor({ data, api, readOnly }) {
        this.api = api;
        this._data = {};
        this.element = null;
        this.readOnly = readOnly;

        this.data = data;
    }

    set data(data) {
        if (!(data instanceof Object)) {
            throw Error('Twitter Tool data should be object');
        }

        const { service, embed, source, theme, caption = '' } = data;

        this._data = {
            service: service || this.data.service,
            embed: embed || this.data.embed,
            source: source || this.data.source,
            theme: theme || this.data.theme,
            caption: caption || this.data.caption || '',
        };

        const oldView = this.element;

        if (oldView) {
            oldView.parentNode.replaceChild(this.render(), oldView);
        }
    }

    get data() {
        if (this.element) {
            const caption = this.element.querySelector(`.${this.api.styles.input}`);

            this._data.caption = caption ? caption.innerHTML : '';
        }

        return this._data;
    }

    /**
     * Get plugin styles
     *
     * @returns {object}
     */
    get CSS() {
        return {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,
            container: 'embed-tool',
            containerLoading: 'embed-tool--loading',
            preloader: 'embed-tool__preloader',
            caption: 'embed-tool__caption',
            url: 'embed-tool__url',
            content: 'embed-tool__content',
        };
    }

    /**
     * Render Twitter tool content
     *
     * @returns {HTMLElement}
     */
    render() {
        if (!this.data.service) {
            const container = document.createElement('div');

            this.element = container;

            return container;
        }
        const container = document.createElement('div');
        const caption = document.createElement('div');
        const content = document.createElement('div');
        const preloader = this.createPreloader();

        container.classList.add(this.CSS.baseClass, this.CSS.container, this.CSS.containerLoading);
        caption.classList.add(this.CSS.input, this.CSS.caption);

        container.appendChild(preloader);

        caption.contentEditable = !this.readOnly;
        caption.dataset.placeholder = 'Enter a caption';
        caption.innerHTML = this.data.caption || '';

        content.setAttribute('data-src', this.data.embed);
        content.classList.add(this.CSS.content);

        const embedIsReady = this.embedIsReady(this.data.embed);

        let Component = Twitter.component;
        embedIsReady
            .then((ast) => {
                let app = new Component({ target: content, props: { ast, theme: this.data.theme } });
                container.appendChild(content);
                container.appendChild(caption);
                container.classList.remove(this.CSS.containerLoading);
            });

        this.element = container;

        return container;
    }

    /**
     * Creates preloader to append to container while data is loading
     *
     * @returns {HTMLElement}
     */
    createPreloader() {
        const preloader = document.createElement('preloader');
        const url = document.createElement('div');

        url.textContent = this.data.source;

        preloader.classList.add(this.CSS.preloader);
        url.classList.add(this.CSS.url);

        preloader.appendChild(url);

        return preloader;
    }

    save() {
        return this.data;
    }

    /**
     * Handle pasted url and return Service object
     *
     * @param {PasteEvent} event - event with pasted data
     */
    onPaste(event) {
        const { key: service, data: url } = event.detail;

        const { regex, embedUrl, theme, id = (ids) => ids.shift() } = Twitter.services[service];
        const result = regex.exec(url).slice(1);
        const embed = embedUrl.replace(/<%= remote_id %>/g, id(result));

        this.data = {
            service,
            source: url,
            embed,
            theme,
        };
    }

    static prepare({ config = {} }) {
        const { services = {}, fetch, component } = config;

        const userServices = Object
            .entries(services)
            .filter(([key, value]) => {
                return typeof value === 'object';
            })
            .map(([key, service]) => {
                const { regex, id, embedUrl, theme } = service;

                return [key, {
                    regex,
                    id,
                    embedUrl,
                    theme
                }];
            });

        Twitter.services = userServices.reduce((result, [key, service]) => {
            if (!(key in result)) {
                result[key] = service;

                return result;
            }

            result[key] = Object.assign({}, result[key], service);

            return result;
        }, {});

        Twitter.patterns = userServices
            .reduce((result, [key, item]) => {
                result[key] = item.regex;

                return result;
            }, {});

        Twitter.fetch = fetch;
        Twitter.component = component;
    }

    /**
     * Paste configuration to enable pasted URLs processing by Editor
     *
     * @returns {object} - object of patterns which contain regx for pasteConfig
     */
    static get pasteConfig() {
        return {
            patterns: Twitter.patterns,
        };
    }

    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Checks that mutations in DOM have finished after appending iframe content
     *
     * @param {HTMLElement} targetNode - HTML-element mutations of which to listen
     * @returns {Promise<any>} - result that all mutations have finished
     */
    embedIsReady(embedUrl) {
        return Twitter.fetch({ url: embedUrl, method: 'GET' });
    }
}