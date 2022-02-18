import { now } from './DateUtils';

export default class TimeSizeLimitedCache<K, V> {
    private ttl: number;
    private maxSize: number;
    private map: Map<K, [number, V]>;
    private queue: K[];

    public constructor(ttl: number, maxSize: number) {
        this.ttl = ttl;
        this.maxSize = maxSize;
        this.map = new Map<K, [number, V]>();
        this.queue = [];
    }

    public add(key: K, value: V) {
        this.truncate(this.size() === this.maxSize);
        if (this.has(key)) {
            this.remove(key);
        }
        this.queue.push(key);
        this.map.set(key, [now() + this.ttl, value]);
    }

    public has(key: K) {
        return this.map.has(key);
    }

    public size() {
        return this.map.size;
    }

    public get(key: K) {
        this.truncate();
        const pair = this.map.get(key);
        if (!pair) {
            return null;
        }
        return pair[1];
    }

    public remove(key: K) {
        this.truncate();
        if (!this.has(key)) {
            return;
        }
        this.map.delete(key);
        this.queue = this.queue.filter((k) => k !== key);
    }

    private truncate(forceRemoveFirst = false) {
        const n = now();
        const target: K[] = [];
        let shouldRemove = forceRemoveFirst;
        for (const key of this.queue) {
            const pair = this.map.get(key);
            if (!pair) {
                continue;
            }
            const ttl = pair[0];
            if (ttl < n || shouldRemove) {
                target.push(key);
                shouldRemove = false;
            } else {
                break;
            }
        }
        if (target.length === 0) {
            return;
        }
        this.queue.splice(0, target.length);
        for (const key of target) {
            this.map.delete(key);
        }
    }
}
