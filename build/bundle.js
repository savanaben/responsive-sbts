
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier} [start]
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    /* src\scene0.svelte generated by Svelte v3.59.2 */

    const file$d = "src\\scene0.svelte";

    function create_fragment$d(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Notes";
    			t1 = space();
    			p = element("p");
    			p.textContent = "This prototype is for testing how to make SBTs/complex tasks responsive. How things look and function may not exactly match benchmark functionality and styles.";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Select the Next and Back buttons to change scenes.";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "Browser zoom in and change the window width/height to see how the scenes react.";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "Some scenes will have additional buttons that change how the content displays at high zoom.";
    			attr_dev(h1, "class", "svelte-slk4uz");
    			add_location(h1, file$d, 8, 8, 90);
    			attr_dev(p, "class", "relaxed svelte-slk4uz");
    			add_location(p, file$d, 9, 8, 114);
    			attr_dev(li0, "class", "relaxed svelte-slk4uz");
    			add_location(li0, file$d, 11, 8, 321);
    			attr_dev(li1, "class", "relaxed svelte-slk4uz");
    			add_location(li1, file$d, 12, 8, 406);
    			attr_dev(li2, "class", "relaxed svelte-slk4uz");
    			add_location(li2, file$d, 13, 8, 520);
    			add_location(ul, file$d, 10, 8, 307);
    			attr_dev(div0, "class", "text-box svelte-slk4uz");
    			add_location(div0, file$d, 7, 4, 58);
    			attr_dev(div1, "class", "container svelte-slk4uz");
    			add_location(div1, file$d, 6, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div0, t3);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scene0', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scene0> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Scene0 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scene0",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\tabs.svelte generated by Svelte v3.59.2 */
    const file$c = "src\\tabs.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (41:8) {#each tabs as tab}
    function create_each_block_1(ctx) {
    	let button;
    	let t0_value = /*tab*/ ctx[8].title + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[5](/*tab*/ ctx[8]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(button, "class", "tab-buttons svelte-uku1e1");
    			toggle_class(button, "active", /*tab*/ ctx[8].title === /*$activeTab*/ ctx[3]);
    			toggle_class(button, "sidebar-button", /*tab*/ ctx[8].action);
    			add_location(button, file$c, 41, 12, 1223);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*tabs*/ 1 && t0_value !== (t0_value = /*tab*/ ctx[8].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*tabs, $activeTab*/ 9) {
    				toggle_class(button, "active", /*tab*/ ctx[8].title === /*$activeTab*/ ctx[3]);
    			}

    			if (dirty & /*tabs*/ 1) {
    				toggle_class(button, "sidebar-button", /*tab*/ ctx[8].action);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(41:8) {#each tabs as tab}",
    		ctx
    	});

    	return block;
    }

    // (52:8) {#if $activeTab}
    function create_if_block$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*tabs*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tabs, $activeTab*/ 9) {
    				each_value = /*tabs*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(52:8) {#if $activeTab}",
    		ctx
    	});

    	return block;
    }

    // (54:16) {#if tab.title === $activeTab && !tab.action}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*tab*/ ctx[8].component;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tabs*/ 1 && switch_value !== (switch_value = /*tab*/ ctx[8].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(54:16) {#if tab.title === $activeTab && !tab.action}",
    		ctx
    	});

    	return block;
    }

    // (53:12) {#each tabs as tab}
    function create_each_block(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*tab*/ ctx[8].title === /*$activeTab*/ ctx[3] && !/*tab*/ ctx[8].action && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*tab*/ ctx[8].title === /*$activeTab*/ ctx[3] && !/*tab*/ ctx[8].action) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*tabs, $activeTab*/ 9) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(53:12) {#each tabs as tab}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	let each_value_1 = /*tabs*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block = /*$activeTab*/ ctx[3] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "tabs-buttons svelte-uku1e1");
    			add_location(div0, file$c, 39, 4, 1154);
    			attr_dev(div1, "class", "tab-content svelte-uku1e1");
    			set_style(div1, "background-image", /*tabs*/ ctx[0].find(/*func*/ ctx[6])?.backgroundImage || 'none');
    			set_style(div1, "background-size", "cover");
    			set_style(div1, "background-position", "bottom");
    			set_style(div1, "background-repeat", "no-repeat");
    			add_location(div1, file$c, 50, 4, 1514);
    			attr_dev(div2, "class", "tabs-container svelte-uku1e1");
    			add_location(div2, file$c, 38, 0, 1120);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			append_dev(div2, t);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			/*div1_binding*/ ctx[7](div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tabs, $activeTab, handleTabClick*/ 25) {
    				each_value_1 = /*tabs*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*$activeTab*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeTab*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*tabs, $activeTab*/ 9) {
    				set_style(div1, "background-image", /*tabs*/ ctx[0].find(/*func*/ ctx[6])?.backgroundImage || 'none');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			/*div1_binding*/ ctx[7](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $activeTab,
    		$$unsubscribe_activeTab = noop,
    		$$subscribe_activeTab = () => ($$unsubscribe_activeTab(), $$unsubscribe_activeTab = subscribe(activeTab, $$value => $$invalidate(3, $activeTab = $$value)), activeTab);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_activeTab());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tabs', slots, []);
    	let { tabs = [] } = $$props;
    	let { activeTab } = $$props;
    	validate_store(activeTab, 'activeTab');
    	$$subscribe_activeTab();
    	let tabContent;

    	// Function to handle tab click
    	function handleTabClick(tab) {
    		// Save the current scroll position if tabContent is defined
    		if (tabContent) {
    			tabScrollPositions.update(positions => {
    				positions[$activeTab] = tabContent.scrollTop;
    				return positions;
    			});
    		}

    		if (tab.action) {
    			tab.action(); // Execute the action if it exists
    		} else {
    			activeTab.set(tab.title); // Set the active tab normally
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (activeTab === undefined && !('activeTab' in $$props || $$self.$$.bound[$$self.$$.props['activeTab']])) {
    			console.warn("<Tabs> was created without expected prop 'activeTab'");
    		}
    	});

    	const writable_props = ['tabs', 'activeTab'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tabs> was created with unknown prop '${key}'`);
    	});

    	const click_handler = tab => handleTabClick(tab);
    	const func = tab => tab.title === $activeTab;

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tabContent = $$value;
    			($$invalidate(2, tabContent), $$invalidate(3, $activeTab));
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('tabs' in $$props) $$invalidate(0, tabs = $$props.tabs);
    		if ('activeTab' in $$props) $$subscribe_activeTab($$invalidate(1, activeTab = $$props.activeTab));
    	};

    	$$self.$capture_state = () => ({
    		writable,
    		sidebarOpen,
    		tabScrollPositions,
    		tabs,
    		activeTab,
    		tabContent,
    		handleTabClick,
    		$activeTab
    	});

    	$$self.$inject_state = $$props => {
    		if ('tabs' in $$props) $$invalidate(0, tabs = $$props.tabs);
    		if ('activeTab' in $$props) $$subscribe_activeTab($$invalidate(1, activeTab = $$props.activeTab));
    		if ('tabContent' in $$props) $$invalidate(2, tabContent = $$props.tabContent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tabContent, $activeTab*/ 12) {
    			// Restore the scroll position when the active tab changes
    			{
    				if (tabContent) {
    					tabScrollPositions.subscribe(positions => {
    						if (positions[$activeTab] !== undefined && tabContent) {
    							$$invalidate(2, tabContent.scrollTop = positions[$activeTab], tabContent);
    						}
    					});
    				}
    			}
    		}
    	};

    	return [
    		tabs,
    		activeTab,
    		tabContent,
    		$activeTab,
    		handleTabClick,
    		click_handler,
    		func,
    		div1_binding
    	];
    }

    class Tabs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { tabs: 0, activeTab: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tabs",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get tabs() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabs(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeTab() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeTab(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = 'y' } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const primary_property = axis === 'y' ? 'height' : 'width';
        const primary_property_value = parseFloat(style[primary_property]);
        const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
        const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
        const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
        const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
        const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
        const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
        const border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]);
        const border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `${primary_property}: ${t * primary_property_value}px;` +
                `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
                `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
                `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
                `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
                `border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
                `border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
        };
    }

    /* src\Sidebar.svelte generated by Svelte v3.59.2 */
    const file$b = "src\\Sidebar.svelte";

    // (29:4) {#if $sidebarOpen}
    function create_if_block$3(ctx) {
    	let div;
    	let button;
    	let t1;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "×";
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", "close-button svelte-c0t3jx");
    			add_location(button, file$b, 30, 12, 894);
    			attr_dev(div, "class", "sidebar svelte-c0t3jx");
    			add_location(div, file$b, 29, 8, 788);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(div, t1);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*closeSidebar*/ ctx[1], false, false, false, false),
    					listen_dev(div, "click", stop_propagation(/*click_handler*/ ctx[5]), false, false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, { duration: 300, axis: 'x' }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, { duration: 300, axis: 'x' }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(29:4) {#if $sidebarOpen}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*$sidebarOpen*/ ctx[0] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "svelte-c0t3jx");
    			toggle_class(div, "dimmed", /*$sidebarOpen*/ ctx[0]);
    			add_location(div, file$b, 27, 0, 691);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*handleClickOutside*/ ctx[2], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$sidebarOpen*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$sidebarOpen*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*$sidebarOpen*/ 1) {
    				toggle_class(div, "dimmed", /*$sidebarOpen*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $sidebarOpen;
    	validate_store(sidebarOpen, 'sidebarOpen');
    	component_subscribe($$self, sidebarOpen, $$value => $$invalidate(0, $sidebarOpen = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sidebar', slots, ['default']);
    	const dispatch = createEventDispatcher();

    	function closeSidebar() {
    		sidebarOpen.set(false);
    		dispatch('close');
    	}

    	// Close sidebar when clicking outside
    	function handleClickOutside(event) {
    		if (event.target === event.currentTarget) {
    			closeSidebar();
    		}
    	}

    	// Close sidebar with Escape key
    	window.addEventListener('keydown', event => {
    		if (event.key === 'Escape') {
    			closeSidebar();
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		sidebarOpen,
    		slide,
    		dispatch,
    		closeSidebar,
    		handleClickOutside,
    		$sidebarOpen
    	});

    	return [$sidebarOpen, closeSidebar, handleClickOutside, $$scope, slots, click_handler];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\Avatar.svelte generated by Svelte v3.59.2 */
    const file$a = "src\\Avatar.svelte";

    function create_fragment$a(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let p;
    	let t1;
    	let t2;
    	let div1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(/*name*/ ctx[1]);
    			t2 = space();
    			div1 = element("div");
    			if (!src_url_equal(img.src, img_src_value = /*imageUrl*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*name*/ ctx[1]);
    			attr_dev(img, "class", "svelte-c7evnt");
    			add_location(img, file$a, 23, 6, 737);
    			attr_dev(p, "class", "nameplate svelte-c7evnt");
    			add_location(p, file$a, 24, 6, 778);
    			attr_dev(div0, "class", "image-container svelte-c7evnt");
    			add_location(div0, file$a, 22, 4, 700);
    			attr_dev(div1, "class", "text-content svelte-c7evnt");
    			add_location(div1, file$a, 26, 4, 827);
    			attr_dev(div2, "class", "avatar-container svelte-c7evnt");
    			add_location(div2, file$a, 21, 2, 664);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			div1.innerHTML = /*text*/ ctx[2];

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*handleClick*/ ctx[3], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imageUrl*/ 1 && !src_url_equal(img.src, img_src_value = /*imageUrl*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*name*/ 2) {
    				attr_dev(img, "alt", /*name*/ ctx[1]);
    			}

    			if (dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);
    			if (dirty & /*text*/ 4) div1.innerHTML = /*text*/ ctx[2];		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Avatar', slots, []);
    	let { imageUrl = '' } = $$props;
    	let { name = '' } = $$props;
    	let { text = '' } = $$props;

    	// Function to handle highlight
    	function highlight() {
    		tabSwitchAndHighlight.set('Organizer'); // Set the tab to switch to
    	}

    	// Function to handle click events in the text content
    	function handleClick(event) {
    		if (event.target.classList.contains('highlight-button')) {
    			highlight();
    		}
    	}

    	const writable_props = ['imageUrl', 'name', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Avatar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('imageUrl' in $$props) $$invalidate(0, imageUrl = $$props.imageUrl);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({
    		tabSwitchAndHighlight,
    		imageUrl,
    		name,
    		text,
    		highlight,
    		handleClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('imageUrl' in $$props) $$invalidate(0, imageUrl = $$props.imageUrl);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imageUrl, name, text, handleClick];
    }

    class Avatar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { imageUrl: 0, name: 1, text: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Avatar",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get imageUrl() {
    		throw new Error("<Avatar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imageUrl(value) {
    		throw new Error("<Avatar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Avatar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Avatar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Avatar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Avatar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\LeftPanelContent.svelte generated by Svelte v3.59.2 */
    const file$9 = "src\\LeftPanelContent.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let avatar;
    	let t0;
    	let p;
    	let current;

    	avatar = new Avatar({
    			props: {
    				imageUrl: "diana-mugshot-square.png",
    				name: "Jane Doe",
    				text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, "
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(avatar.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.";
    			add_location(p, file$9, 10, 4, 327);
    			add_location(div, file$9, 4, 2, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(avatar, div, null);
    			append_dev(div, t0);
    			append_dev(div, p);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(avatar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(avatar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(avatar);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LeftPanelContent', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LeftPanelContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Avatar });
    	return [];
    }

    class LeftPanelContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LeftPanelContent",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\tab1Content.svelte generated by Svelte v3.59.2 */
    const file$8 = "src\\tab1Content.svelte";

    function create_fragment$8(ctx) {
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t7;
    	let p3;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Passage title";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief. It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.";
    			t7 = space();
    			p3 = element("p");
    			p3.textContent = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.It was the best of times, it was the worst of tk.";
    			add_location(h1, file$8, 6, 4, 75);
    			add_location(p0, file$8, 7, 4, 103);
    			add_location(p1, file$8, 8, 4, 528);
    			add_location(p2, file$8, 9, 4, 815);
    			add_location(p3, file$8, 10, 4, 1102);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p2, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p3, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tab1Content', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tab1Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Avatar });
    	return [];
    }

    class Tab1Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tab1Content",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\tab2Content.svelte generated by Svelte v3.59.2 */
    const file$7 = "src\\tab2Content.svelte";

    function create_fragment$7(ctx) {
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let tbody;
    	let tr1;
    	let td0;
    	let t7;
    	let td1;
    	let t9;
    	let td2;
    	let t11;
    	let tr2;
    	let td3;
    	let t13;
    	let td4;
    	let t15;
    	let td5;
    	let t17;
    	let tr3;
    	let td6;
    	let t19;
    	let td7;
    	let t21;
    	let td8;

    	const block = {
    		c: function create() {
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Header 1";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Header 2";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Header 3";
    			t5 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    			t7 = space();
    			td1 = element("td");
    			td1.textContent = "Quisque vitae semper sem, non venenatis ligula.";
    			t9 = space();
    			td2 = element("td");
    			td2.textContent = "Aliquam erat volutpat. Donec id elit non mi porta gravida at eget metus.";
    			t11 = space();
    			tr2 = element("tr");
    			td3 = element("td");
    			td3.textContent = "Curabitur blandit tempus porttitor.";
    			t13 = space();
    			td4 = element("td");
    			td4.textContent = "Vestibulum id ligula porta felis euismod semper.";
    			t15 = space();
    			td5 = element("td");
    			td5.textContent = "Donec ullamcorper nulla non metus auctor fringilla.";
    			t17 = space();
    			tr3 = element("tr");
    			td6 = element("td");
    			td6.textContent = "Donec id elit non mi porta gravida at eget metus.";
    			t19 = space();
    			td7 = element("td");
    			td7.textContent = "Maecenas faucibus mollis interdum.";
    			t21 = space();
    			td8 = element("td");
    			td8.textContent = "Donec ullamcorper nulla non metus auctor fringilla.";
    			attr_dev(th0, "class", "svelte-1efxw2p");
    			add_location(th0, file$7, 8, 12, 121);
    			attr_dev(th1, "class", "svelte-1efxw2p");
    			add_location(th1, file$7, 9, 12, 152);
    			attr_dev(th2, "class", "svelte-1efxw2p");
    			add_location(th2, file$7, 10, 12, 183);
    			add_location(tr0, file$7, 7, 8, 103);
    			add_location(thead, file$7, 6, 4, 86);
    			attr_dev(td0, "class", "svelte-1efxw2p");
    			add_location(td0, file$7, 15, 12, 270);
    			attr_dev(td1, "class", "svelte-1efxw2p");
    			add_location(td1, file$7, 16, 12, 349);
    			attr_dev(td2, "class", "svelte-1efxw2p");
    			add_location(td2, file$7, 17, 12, 419);
    			add_location(tr1, file$7, 14, 8, 252);
    			attr_dev(td3, "class", "svelte-1efxw2p");
    			add_location(td3, file$7, 20, 12, 543);
    			attr_dev(td4, "class", "svelte-1efxw2p");
    			add_location(td4, file$7, 21, 12, 601);
    			attr_dev(td5, "class", "svelte-1efxw2p");
    			add_location(td5, file$7, 22, 12, 672);
    			add_location(tr2, file$7, 19, 8, 525);
    			attr_dev(td6, "class", "svelte-1efxw2p");
    			add_location(td6, file$7, 25, 12, 775);
    			attr_dev(td7, "class", "svelte-1efxw2p");
    			add_location(td7, file$7, 26, 12, 847);
    			attr_dev(td8, "class", "svelte-1efxw2p");
    			add_location(td8, file$7, 27, 12, 904);
    			add_location(tr3, file$7, 24, 8, 757);
    			add_location(tbody, file$7, 13, 4, 235);
    			attr_dev(table, "class", "svelte-1efxw2p");
    			add_location(table, file$7, 5, 2, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(table, t5);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t7);
    			append_dev(tr1, td1);
    			append_dev(tr1, t9);
    			append_dev(tr1, td2);
    			append_dev(tbody, t11);
    			append_dev(tbody, tr2);
    			append_dev(tr2, td3);
    			append_dev(tr2, t13);
    			append_dev(tr2, td4);
    			append_dev(tr2, t15);
    			append_dev(tr2, td5);
    			append_dev(tbody, t17);
    			append_dev(tbody, tr3);
    			append_dev(tr3, td6);
    			append_dev(tr3, t19);
    			append_dev(tr3, td7);
    			append_dev(tr3, t21);
    			append_dev(tr3, td8);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tab2Content', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tab2Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Avatar });
    	return [];
    }

    class Tab2Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tab2Content",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\scene1.svelte generated by Svelte v3.59.2 */
    const file$6 = "src\\scene1.svelte";

    // (56:0) <Sidebar>
    function create_default_slot(ctx) {
    	let div;
    	let leftpanelcontent;
    	let current;
    	leftpanelcontent = new LeftPanelContent({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(leftpanelcontent.$$.fragment);
    			attr_dev(div, "class", "panel");
    			add_location(div, file$6, 56, 4, 2126);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(leftpanelcontent, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftpanelcontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftpanelcontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(leftpanelcontent);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(56:0) <Sidebar>",
    		ctx
    	});

    	return block;
    }

    // (71:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let tabs_1;
    	let current;

    	tabs_1 = new Tabs({
    			props: { tabs: /*tabs*/ ctx[0], activeTab },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(tabs_1.$$.fragment);
    			attr_dev(div, "class", "tab-panel");
    			add_location(div, file$6, 71, 8, 2512);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tabs_1, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabs_1_changes = {};
    			if (dirty & /*tabs*/ 1) tabs_1_changes.tabs = /*tabs*/ ctx[0];
    			tabs_1.$set(tabs_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabs_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabs_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(tabs_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(71:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (62:4) {#if $breakpoint > 800}
    function create_if_block$2(ctx) {
    	let div2;
    	let div0;
    	let leftpanelcontent;
    	let t;
    	let div1;
    	let tabs_1;
    	let current;
    	leftpanelcontent = new LeftPanelContent({ $$inline: true });

    	tabs_1 = new Tabs({
    			props: { tabs: /*tabs*/ ctx[0], activeTab },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(leftpanelcontent.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(tabs_1.$$.fragment);
    			attr_dev(div0, "class", "panel");
    			add_location(div0, file$6, 63, 12, 2294);
    			attr_dev(div1, "class", "tab-panel");
    			add_location(div1, file$6, 66, 12, 2385);
    			attr_dev(div2, "class", "layout");
    			add_location(div2, file$6, 62, 8, 2260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(leftpanelcontent, div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(tabs_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabs_1_changes = {};
    			if (dirty & /*tabs*/ 1) tabs_1_changes.tabs = /*tabs*/ ctx[0];
    			tabs_1.$set(tabs_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftpanelcontent.$$.fragment, local);
    			transition_in(tabs_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftpanelcontent.$$.fragment, local);
    			transition_out(tabs_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(leftpanelcontent);
    			destroy_component(tabs_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(62:4) {#if $breakpoint > 800}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let sidebar;
    	let t;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;

    	sidebar = new Sidebar({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$breakpoint*/ ctx[1] > 800) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(sidebar.$$.fragment);
    			t = space();
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "layout");
    			add_location(div, file$6, 60, 0, 2201);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sidebar, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sidebar_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				sidebar_changes.$$scope = { dirty, ctx };
    			}

    			sidebar.$set(sidebar_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sidebar, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $activeTab;
    	let $layoutMode;
    	let $breakpoint;
    	validate_store(activeTab, 'activeTab');
    	component_subscribe($$self, activeTab, $$value => $$invalidate(4, $activeTab = $$value));
    	validate_store(layoutMode, 'layoutMode');
    	component_subscribe($$self, layoutMode, $$value => $$invalidate(5, $layoutMode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scene1', slots, []);
    	const breakpoint = writable(window.innerWidth);
    	validate_store(breakpoint, 'breakpoint');
    	component_subscribe($$self, breakpoint, value => $$invalidate(1, $breakpoint = value));
    	let tabs = [];
    	let prevBreakpoint = $breakpoint;

    	// Listen to window resize to adjust the breakpoint
    	window.onresize = () => {
    		breakpoint.set(window.innerWidth);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scene1> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		writable,
    		Tabs,
    		Sidebar,
    		sidebarOpen,
    		layoutMode,
    		activeTab,
    		LeftPanelContent,
    		Tab1Content,
    		Tab2Content,
    		breakpoint,
    		tabs,
    		prevBreakpoint,
    		$activeTab,
    		$layoutMode,
    		$breakpoint
    	});

    	$$self.$inject_state = $$props => {
    		if ('tabs' in $$props) $$invalidate(0, tabs = $$props.tabs);
    		if ('prevBreakpoint' in $$props) $$invalidate(3, prevBreakpoint = $$props.prevBreakpoint);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$breakpoint, prevBreakpoint, $layoutMode, tabs, $activeTab*/ 59) {
    			// Reactive statement to adjust tabs based on the breakpoint
    			{
    				if ($breakpoint < 800 && prevBreakpoint >= 800) {
    					if ($layoutMode !== 'sidebar') {
    						activeTab.set('Activity'); // Set the active tab to 'Activity'
    					}
    				}

    				$$invalidate(3, prevBreakpoint = $breakpoint);

    				if ($breakpoint < 800) {
    					$$invalidate(0, tabs = [
    						{
    							title: 'Passage',
    							component: Tab1Content,
    							type: 'tab'
    						},
    						{
    							title: 'Organizer',
    							component: Tab2Content,
    							type: 'tab'
    						}
    					]);

    					if ($layoutMode === 'sidebar') {
    						tabs.unshift({
    							title: 'Activity',
    							action: () => sidebarOpen.set(true),
    							type: 'button'
    						});

    						if ($activeTab === null || $activeTab === undefined) {
    							activeTab.set('Passage');
    						}
    					} else {
    						tabs.unshift({
    							title: 'Activity',
    							component: LeftPanelContent,
    							type: 'tab'
    						});
    					}
    				} else {
    					$$invalidate(0, tabs = [
    						{
    							title: 'Passage',
    							component: Tab1Content,
    							type: 'tab'
    						},
    						{
    							title: 'Organizer',
    							component: Tab2Content,
    							type: 'tab'
    						}
    					]);

    					if ($activeTab === 'Activity' || $activeTab === null || $activeTab === undefined) {
    						activeTab.set('Passage');
    					}

    					sidebarOpen.set(false); // Close the sidebar when moving back to split view
    				}
    			}
    		}
    	};

    	return [tabs, $breakpoint, breakpoint, prevBreakpoint, $activeTab, $layoutMode];
    }

    class Scene1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scene1",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\leftPanelContentButton.svelte generated by Svelte v3.59.2 */
    const file$5 = "src\\leftPanelContentButton.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let avatar;
    	let t0;
    	let p;
    	let i;
    	let t1;
    	let strong;
    	let t3;
    	let current;

    	avatar = new Avatar({
    			props: {
    				imageUrl: "diana-mugshot-square.png",
    				name: "Jane Doe",
    				text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief. <p>I updated Topic 2 with the <button class=\"highlight-button\">key facts</button> we decided to add.</p>"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(avatar.$$.fragment);
    			t0 = space();
    			p = element("p");
    			i = element("i");
    			t1 = text("When you are finished reviewing the key facts, select the ");
    			strong = element("strong");
    			strong.textContent = "Next";
    			t3 = text(" button to continue.");
    			add_location(strong, file$5, 13, 66, 484);
    			add_location(i, file$5, 13, 5, 423);
    			add_location(p, file$5, 13, 2, 420);
    			add_location(div, file$5, 7, 0, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(avatar, div, null);
    			append_dev(div, t0);
    			append_dev(div, p);
    			append_dev(p, i);
    			append_dev(i, t1);
    			append_dev(i, strong);
    			append_dev(i, t3);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(avatar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(avatar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(avatar);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LeftPanelContentButton', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LeftPanelContentButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Avatar });
    	return [];
    }

    class LeftPanelContentButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LeftPanelContentButton",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\OrganizerWithBackground.svelte generated by Svelte v3.59.2 */
    const file$4 = "src\\OrganizerWithBackground.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div0;
    	let h30;
    	let t1;
    	let p0;
    	let t3;
    	let div1;
    	let h31;
    	let t5;
    	let p1;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = `${/*title1*/ ctx[0]}`;
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = `${/*text*/ ctx[2]}`;
    			t3 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = `${/*title2*/ ctx[1]}`;
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = `${/*text2*/ ctx[3]}`;
    			add_location(h30, file$4, 14, 8, 459);
    			add_location(p0, file$4, 15, 8, 486);
    			attr_dev(div0, "class", "box svelte-gh43f9");
    			add_location(div0, file$4, 13, 4, 432);
    			add_location(h31, file$4, 18, 8, 544);
    			attr_dev(p1, "id", "highlight-target");
    			attr_dev(p1, "class", "svelte-gh43f9");
    			add_location(p1, file$4, 19, 8, 571);
    			attr_dev(div1, "class", "box svelte-gh43f9");
    			add_location(div1, file$4, 17, 4, 517);
    			attr_dev(div2, "class", "background svelte-gh43f9");
    			add_location(div2, file$4, 11, 0, 397);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OrganizerWithBackground', slots, []);
    	let title1 = "Topic 1";
    	let title2 = "Topic 2";
    	let text = "Demo of the different value of the background-image property. Demo of the different values of the background-image property.";
    	let text2 = "Here's some key facts we decided to add to this topic.";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OrganizerWithBackground> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		pulseHighlight,
    		title1,
    		title2,
    		text,
    		text2
    	});

    	$$self.$inject_state = $$props => {
    		if ('title1' in $$props) $$invalidate(0, title1 = $$props.title1);
    		if ('title2' in $$props) $$invalidate(1, title2 = $$props.title2);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('text2' in $$props) $$invalidate(3, text2 = $$props.text2);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title1, title2, text, text2];
    }

    class OrganizerWithBackground extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OrganizerWithBackground",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    var asset1 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NzEiIGhlaWdodD0iODk1IiB2aWV3Qm94PSIwIDAgNzcxIDg5NSI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2RkZmZmYjsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTIsIC5jbHMtMywgLmNscy00IHsKICAgICAgICBzdHJva2Utd2lkdGg6IDBweDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjYzRkZGJjOwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6ICNiOGU1ZGQ7CiAgICAgIH0KCiAgICAgIC5jbHMtNCB7CiAgICAgICAgZmlsbDogI2M2ZWNlNzsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgIDxnPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MC44Myw3OTUuNThjMTUuMTUuMTUsMzAuMDksOS40OSwzOS41MSwyNC43MSw2LjE2LTEzLjI4LDE3LjE4LTIyLjA1LDI4Ljg0LTI1Ljg5LDExLjY2LTMuODQsMjMuOTYtMy4xOCwzNS44Ny0uOTEsMjEuMzQsNC4wOCw0Mi4wOCwxMy4zMiw2MC44MSwyNy4wOSwyLjY5LDEuOTgsNS42NCw0LjEzLDguNywzLjQ5LDIuMzEtLjQ4LDQuMjItMi40Niw2LjEyLTQuMTksMTEuNi0xMC41OSwyNy4wNS0xMy44OCw0MC43LTguNjgsMTMuNjUsNS4yLDI1LjE5LDE4Ljc5LDMwLjQxLDM1Ljc5LDE2LjEyLTExLjgxLDM2LjcyLTExLjI0LDUzLjU5LTEuMzMsMy42OSwyLjE3LDcuMTksNC43NiwxMC41Myw3LjY4LDguMzktMTAuNjYsMTkuNjQtMTcuODgsMzEuMzktMTkuOTQsMjAuMjEtMy41Myw0MS4wNCw2Ljg4LDU2LjA1LDI0LjU5LDEzLjM1LTE5LjI5LDI4LjM2LTM3LjcsNDcuMDEtNDcuMzUsMTguNjQtOS42NSw0MS42Ni04LjkyLDU3LjExLDcuNTksMi43OC0zMC4wMSwyMi44MS01NS45Niw0Ni4xNy01OS44MSwyMy4zNi0zLjg1LDQ3Ljg1LDE0Ljc1LDU2LjQ2LDQyLjg5LDE1LjQ0LTI5Ljg3LDQ0LjA0LTQ3LjY2LDcxLjg4LTQ0LjczLDE4LjM4LDEuOTQsMzUuOTMsMTIuODcsNDkuMDMsMjkuNDhWMEgwdjgyMS4xMWMuMzYtLjUyLjctMS4wNiwxLjA0LTEuNTgsOS42LTE1LjA0LDI0LjY1LTI0LjA5LDM5LjgtMjMuOTRaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTI3Ni41NCw3NTkuMjJjNS4zNy01Ljc4LDEyLjYzLTguOTksMTkuNjktMTIuMDMsMS43OS0yMy4yMSwyNi4xNS00MS4wNiw0Ni45Mi0zNC4zOCwyLjE2LTguODgsNi43MS0xNi44LDEyLjc2LTIzLjIyLTMuMzQtMi40NC02Ljg0LTQuNjItMTAuNTMtNi40My0xNi44Ny04LjMtMzcuNDgtOC43Ny01My41OSwxLjExLTUuMjItMTQuMjMtMTYuNzYtMjUuNi0zMC40MS0yOS45Ni0xMy42NS00LjM2LTI5LjEtMS42LTQwLjcsNy4yNi0xLjksMS40NS0zLjgxLDMuMTEtNi4xMiwzLjUxLTMuMDYuNTMtNi4wMS0xLjI3LTguNy0yLjkzLTE4LjcyLTExLjUyLTM5LjQ2LTE5LjI2LTYwLjgxLTIyLjY3LTExLjkxLTEuOTEtMjQuMjEtMi40Ni0zNS44Ny43Ni0xMS42NiwzLjIyLTIyLjY4LDEwLjU2LTI4Ljg0LDIxLjY3LTkuNDItMTIuNzQtMjQuMzYtMjAuNTYtMzkuNTEtMjAuNjgtMTUuMTUtLjEyLTMwLjIsNy40Ni0zOS44LDIwLjA0LS4zMy40NC0uNjguODktMS4wNCwxLjMydjEzOS4zOWM5MC42OS0xNy4zMywxODIuMzItMzAuOTcsMjc0LjQxLTQwLjEyLjY2LS45NCwxLjM3LTEuODMsMi4xMy0yLjY2WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik03MjEuOTcsNTg5LjZjLTI3Ljg0LTIuNDYtNTYuNDMsMTIuNDQtNzEuODgsMzcuNDQtOC42LTIzLjU1LTMzLjEtMzkuMTMtNTYuNDYtMzUuOS0yMy4zNiwzLjIzLTQzLjM5LDI0Ljk1LTQ2LjE3LDUwLjA3LTE1LjQ1LTEzLjgyLTM4LjQ3LTE0LjQzLTU3LjExLTYuMzZzLTMzLjY2LDIzLjQ5LTQ3LjAxLDM5LjY0Yy0xNS4wMi0xNC44My0zNS44NC0yMy41NC01Ni4wNS0yMC41OS0xMS43NSwxLjcyLTIzLDcuNzctMzEuMzksMTYuNjktNi4wNCw2LjQzLTEwLjYsMTQuMzUtMTIuNzYsMjMuMjItMjAuNzctNi42OC00NS4xMywxMS4xNy00Ni45MiwzNC4zOC03LjA2LDMuMDMtMTQuMzIsNi4yNC0xOS42OSwxMi4wMy0uNzYuODItMS40NywxLjcyLTIuMTMsMi42Niw0Mi41OS00LjIzLDg1LjI4LTcuNSwxMjguMDItOS43Miw5Mi43LTQuODIsMTg1LjYzLTQuNzMsMjc4LjI5LDEuMTIsMzAuNDQsMS45Miw2MS4yNyw0LjU4LDkwLjI4LDEyLjg5di0xMzIuODljLTEzLjEtMTMuOTEtMzAuNjUtMjMuMDUtNDkuMDMtMjQuNjhaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTY4MC43Miw3MjQuMjZjLTkyLjY2LTUuNDQtMTg1LjU5LTUuNTItMjc4LjI5LTEuMDQtNDIuNzQsMi4wNy04NS40Myw1LjExLTEyOC4wMiw5LjA1LTkyLjA5LDguNTEtMTgzLjcyLDIxLjIxLTI3NC40MSwzNy4zNXYxMjUuMzhoNzcxdi0xNTguNzRjLTI5LjAyLTcuNzQtNTkuODUtMTAuMjEtOTAuMjgtMTJaIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=';

    /* src\scene2.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\scene2.svelte";

    function create_fragment$3(ctx) {
    	let div2;
    	let div0;
    	let leftpanelcontentbutton;
    	let t;
    	let div1;
    	let organizerwithbackground;
    	let current;
    	leftpanelcontentbutton = new LeftPanelContentButton({ $$inline: true });
    	organizerwithbackground = new OrganizerWithBackground({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(leftpanelcontentbutton.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(organizerwithbackground.$$.fragment);
    			attr_dev(div0, "class", "panel svelte-1sl6axm");
    			add_location(div0, file$3, 50, 4, 2441);
    			attr_dev(div1, "class", "panel background svelte-1sl6axm");
    			set_style(div1, "background-image", /*backgroundImage*/ ctx[0]);
    			add_location(div1, file$3, 53, 4, 2514);
    			attr_dev(div2, "class", "layout svelte-1sl6axm");
    			add_location(div2, file$3, 49, 0, 2415);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(leftpanelcontentbutton, div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(organizerwithbackground, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftpanelcontentbutton.$$.fragment, local);
    			transition_in(organizerwithbackground.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftpanelcontentbutton.$$.fragment, local);
    			transition_out(organizerwithbackground.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(leftpanelcontentbutton);
    			destroy_component(organizerwithbackground);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scene2', slots, []);
    	let backgroundImage = `url(${asset1})`;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scene2> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LeftPanelContentButton,
    		OrganizerWithBackground,
    		asset1,
    		getBackgroundStyle,
    		layoutMode,
    		activeTab,
    		highlightTarget,
    		tabSwitchAndHighlight,
    		backgroundImage
    	});

    	$$self.$inject_state = $$props => {
    		if ('backgroundImage' in $$props) $$invalidate(0, backgroundImage = $$props.backgroundImage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	tabSwitchAndHighlight.subscribe(value => {
    		if (value === 'Organizer') {
    			activeTab.set('Organizer');

    			setTimeout(
    				() => {
    					const node = document.getElementById('highlight-target');

    					if (node) {
    						node.scrollIntoView({ behavior: 'smooth' });

    						setTimeout(
    							() => {
    								// Define keyframes and animation properties directly
    								const keyframes = `
                            @keyframes pulse {
                                0% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                25% { background-color: transparent; outline: 1px solid white; }
                                50% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                75% { background-color: transparent; outline: 1px solid white; }
                                100% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                            }
                        `;

    								// Create a style element and append it to the node
    								const style = document.createElement('style');

    								style.innerHTML = keyframes;
    								node.appendChild(style);

    								// Apply the animation to the node
    								node.style.animation = `pulse 1200ms infinite`;

    								setTimeout(
    									() => {
    										node.style.animation = '';
    										node.removeChild(style); // Clean up the style element
    										tabSwitchAndHighlight.set(null); // Reset the store
    									},
    									1000
    								); // Duration of the pulse effect
    							},
    							700
    						); // Delay before starting the pulse effect
    					}
    				},
    				400
    			); // Ensure the tab switch happens first
    		}
    	});

    	return [backgroundImage];
    }

    class Scene2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scene2",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\scene3.svelte generated by Svelte v3.59.2 */
    const file$2 = "src\\scene3.svelte";

    // (81:4) {:else}
    function create_else_block(ctx) {
    	let div;
    	let tabs_1;
    	let current;

    	tabs_1 = new Tabs({
    			props: { tabs: /*tabs*/ ctx[3], activeTab },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(tabs_1.$$.fragment);
    			attr_dev(div, "class", "tab-panel");
    			add_location(div, file$2, 81, 8, 3472);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tabs_1, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabs_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabs_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(tabs_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(81:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (72:4) {#if $breakpoint > 800}
    function create_if_block$1(ctx) {
    	let div2;
    	let div0;
    	let leftpanelcontentbutton;
    	let t;
    	let div1;
    	let organizerwithbackground;
    	let current;
    	leftpanelcontentbutton = new LeftPanelContentButton({ $$inline: true });
    	organizerwithbackground = new OrganizerWithBackground({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(leftpanelcontentbutton.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(organizerwithbackground.$$.fragment);
    			attr_dev(div0, "class", "panel svelte-6sj2g9");
    			add_location(div0, file$2, 73, 12, 3196);
    			attr_dev(div1, "class", "panel background svelte-6sj2g9");
    			set_style(div1, "background-image", /*backgroundImage*/ ctx[1]);
    			add_location(div1, file$2, 76, 12, 3293);
    			attr_dev(div2, "class", "layout svelte-6sj2g9");
    			add_location(div2, file$2, 72, 8, 3162);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(leftpanelcontentbutton, div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(organizerwithbackground, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftpanelcontentbutton.$$.fragment, local);
    			transition_in(organizerwithbackground.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftpanelcontentbutton.$$.fragment, local);
    			transition_out(organizerwithbackground.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(leftpanelcontentbutton);
    			destroy_component(organizerwithbackground);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(72:4) {#if $breakpoint > 800}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$breakpoint*/ ctx[0] > 800) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			add_location(div, file$2, 70, 0, 3118);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $breakpoint;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scene3', slots, []);
    	let backgroundImage = `url(${asset1})`;
    	const breakpoint = writable(window.innerWidth);
    	validate_store(breakpoint, 'breakpoint');
    	component_subscribe($$self, breakpoint, value => $$invalidate(0, $breakpoint = value));

    	// Listen to window resize to adjust the breakpoint
    	window.onresize = () => {
    		breakpoint.set(window.innerWidth);
    	};

    	// Define tabs based on the components
    	let tabs = [
    		{
    			title: 'Activity',
    			component: LeftPanelContentButton,
    			type: 'tab'
    		},
    		{
    			title: 'Organizer',
    			component: OrganizerWithBackground,
    			type: 'tab',
    			backgroundImage: `url(${asset1})`
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scene3> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		writable,
    		Tabs,
    		getBackgroundStyle,
    		layoutMode,
    		activeTab,
    		highlightTarget,
    		tabSwitchAndHighlight,
    		LeftPanelContentButton,
    		OrganizerWithBackground,
    		asset1,
    		backgroundImage,
    		breakpoint,
    		tabs,
    		$breakpoint
    	});

    	$$self.$inject_state = $$props => {
    		if ('backgroundImage' in $$props) $$invalidate(1, backgroundImage = $$props.backgroundImage);
    		if ('tabs' in $$props) $$invalidate(3, tabs = $$props.tabs);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$breakpoint*/ 1) {
    			// Reactive statement to set the active tab based on the breakpoint
    			if ($breakpoint > 800) {
    				activeTab.set('Activity');
    			}
    		}
    	};

    	tabSwitchAndHighlight.subscribe(value => {
    		if (value === 'Organizer') {
    			activeTab.set('Organizer');

    			setTimeout(
    				() => {
    					const node = document.getElementById('highlight-target');

    					if (node) {
    						node.scrollIntoView({ behavior: 'smooth' });

    						setTimeout(
    							() => {
    								// Define keyframes and animation properties directly
    								const keyframes = `
                            @keyframes pulse {
                                0% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                25% { background-color: transparent; outline: 1px solid white; }
                                50% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                75% { background-color: transparent; outline: 1px solid white; }
                                100% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                            }
                        `;

    								// Create a style element and append it to the node
    								const style = document.createElement('style');

    								style.innerHTML = keyframes;
    								node.appendChild(style);

    								// Apply the animation to the node
    								node.style.animation = `pulse 1200ms infinite`;

    								setTimeout(
    									() => {
    										node.style.animation = '';
    										node.removeChild(style); // Clean up the style element
    										tabSwitchAndHighlight.set(null); // Reset the store
    									},
    									1000
    								); // Duration of the pulse effect
    							},
    							700
    						); // Delay before starting the pulse effect
    					}
    				},
    				400
    			); // Ensure the tab switch happens first
    		}
    	});

    	return [$breakpoint, backgroundImage, breakpoint, tabs];
    }

    class Scene3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scene3",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    function pulseHighlight(node, duration = 700) {
        // Create a new style element if it doesn't already exist
        let style = document.head.querySelector('#pulse-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'pulse-style';
            style.innerHTML = `
            @keyframes pulse {
                0%, 100% { 
                    background-color: #f6d4ff; 
                    outline-color: #A12ECF;
                }
                50% { 
                    background-color: white; 
                    outline-color: white;
                }
            }
        `;
            document.head.appendChild(style);
        }

        // Function to start the animation
        function startAnimation() {
            node.style.animation = 'none'; // Reset animation
            setTimeout(() => {
                node.style.animation = `pulse ${duration}ms ease-in-out 0s 2`;
            }, 10); // Short delay to reapply the animation
        }

        // Scroll to the node smoothly
        node.scrollIntoView({ behavior: 'smooth' });

        // Delay the start of the animation until scrolling is likely complete
        setTimeout(startAnimation, 700); // Adjust this timeout based on typical scroll duration

        // Set the background color to lightpink when the animation ends
        node.addEventListener('animationend', () => {
            node.style.backgroundColor = '#f6d4ff';
        });
    }

    const sidebarOpen = writable(false);
    const layoutMode = writable('tabs'); // 'tabs' or 'sidebar'
    const activeTab = writable(null); // Initialize with no active tab


    const currentSceneIndex = writable(0); // Store to hold the current scene's index
    const scenes = writable([Scene0, Scene1, Scene2, Scene3]); // Array of scenes
    const highlightTarget = writable({ element: null, tab: null }); // New store for highlight target and tab

    const tabSwitchAndHighlight = writable(null); // New store for tab switching and highlighting

    const tabScrollPositions = writable({}); // Store for tab scroll positions


    function getBackgroundStyle(imageUrl) {
        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
        };
    }

    /* src\toolbar.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\toolbar.svelte";

    // (43:4) {#if $currentSceneIndex === 1}
    function create_if_block(ctx) {
    	let button0;
    	let t1;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			button0.textContent = "Tabs";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Sidebar";
    			attr_dev(button0, "class", "toolbar-button svelte-ydhplq");
    			add_location(button0, file$1, 43, 8, 1306);
    			attr_dev(button1, "class", "toolbar-button svelte-ydhplq");
    			add_location(button1, file$1, 44, 8, 1393);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[7], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(43:4) {#if $currentSceneIndex === 1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let t4;
    	let div0;
    	let t5;
    	let mounted;
    	let dispose;
    	let if_block = /*$currentSceneIndex*/ ctx[0] === 1 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Next";
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			div0 = element("div");
    			t5 = text(/*$sceneText*/ ctx[1]);
    			attr_dev(button0, "class", "toolbar-button svelte-ydhplq");
    			add_location(button0, file$1, 40, 4, 1124);
    			attr_dev(button1, "class", "toolbar-button svelte-ydhplq");
    			add_location(button1, file$1, 41, 4, 1195);
    			attr_dev(div0, "class", "scene-text svelte-ydhplq");
    			add_location(div0, file$1, 46, 4, 1493);
    			attr_dev(div1, "class", "toolbar svelte-ydhplq");
    			add_location(div1, file$1, 39, 0, 1097);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button0);
    			append_dev(div1, t1);
    			append_dev(div1, button1);
    			append_dev(div1, t3);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			append_dev(div0, t5);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*prevScene*/ ctx[4], false, false, false, false),
    					listen_dev(button1, "click", /*nextScene*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$currentSceneIndex*/ ctx[0] === 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*$sceneText*/ 2) set_data_dev(t5, /*$sceneText*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $currentSceneIndex;
    	let $scenes;
    	let $sceneText;
    	validate_store(currentSceneIndex, 'currentSceneIndex');
    	component_subscribe($$self, currentSceneIndex, $$value => $$invalidate(0, $currentSceneIndex = $$value));
    	validate_store(scenes, 'scenes');
    	component_subscribe($$self, scenes, $$value => $$invalidate(8, $scenes = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Toolbar', slots, []);

    	function setMode(mode) {
    		layoutMode.set(mode);
    	}

    	// Function to go to the next scene
    	function nextScene() {
    		if ($currentSceneIndex < $scenes.length - 1) {
    			currentSceneIndex.update(n => n + 1);
    		}
    	}

    	// Function to go to the previous scene
    	function prevScene() {
    		if ($currentSceneIndex > 0) {
    			currentSceneIndex.update(n => n - 1);
    		}
    	}

    	// Derived store to get the current scene text
    	const sceneText = derived(currentSceneIndex, $currentSceneIndex => {
    		switch ($currentSceneIndex) {
    			case 0:
    				return "";
    			case 1:
    				return "2 column layout with multiple tabs";
    			case 2:
    				return "2 column stacks";
    			case 3:
    				return "2 column changes to tabs";
    			default:
    				return "";
    		}
    	});

    	validate_store(sceneText, 'sceneText');
    	component_subscribe($$self, sceneText, value => $$invalidate(1, $sceneText = value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Toolbar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => setMode('tabs');
    	const click_handler_1 = () => setMode('sidebar');

    	$$self.$capture_state = () => ({
    		layoutMode,
    		currentSceneIndex,
    		scenes,
    		derived,
    		setMode,
    		nextScene,
    		prevScene,
    		sceneText,
    		$currentSceneIndex,
    		$scenes,
    		$sceneText
    	});

    	return [
    		$currentSceneIndex,
    		$sceneText,
    		setMode,
    		nextScene,
    		prevScene,
    		sceneText,
    		click_handler,
    		click_handler_1
    	];
    }

    class Toolbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toolbar",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let div;
    	let toolbar;
    	let t;
    	let switch_instance;
    	let current;
    	toolbar = new Toolbar({ $$inline: true });
    	var switch_value = /*currentScenes*/ ctx[0][/*$currentSceneIndex*/ ctx[1]];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			create_component(toolbar.$$.fragment);
    			t = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div, "class", "app-container svelte-oxb1f9");
    			add_location(div, file, 13, 4, 233);
    			add_location(main, file, 12, 0, 222);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			mount_component(toolbar, div, null);
    			append_dev(div, t);
    			if (switch_instance) mount_component(switch_instance, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currentScenes, $currentSceneIndex*/ 3 && switch_value !== (switch_value = /*currentScenes*/ ctx[0][/*$currentSceneIndex*/ ctx[1]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toolbar.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toolbar.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(toolbar);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $currentSceneIndex;
    	validate_store(currentSceneIndex, 'currentSceneIndex');
    	component_subscribe($$self, currentSceneIndex, $$value => $$invalidate(1, $currentSceneIndex = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let currentScenes;

    	scenes.subscribe(value => {
    		$$invalidate(0, currentScenes = value);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		currentSceneIndex,
    		scenes,
    		Toolbar,
    		currentScenes,
    		$currentSceneIndex
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentScenes' in $$props) $$invalidate(0, currentScenes = $$props.currentScenes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentScenes, $currentSceneIndex];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
