type Arg = undefined | null | string | Arg[];

const MAX_DEPTH = 5;

class ClassNames {
    private classNames = new Set<string>();

    constructor(...args: Arg[]) {
        this.addArray(args, 0);
    }

    private addSingle(arg: string) {
        if (arg.length > 0) {
            this.classNames.add(arg);
        }
    }

    private addString(arg: string) {
        const args = arg.split(/\s+/);
        if (args.length === 1) {
            this.addSingle(args[0]);
        } else if (args.length > 1) {
            args.forEach((arg) => {
                this.addSingle(arg);
            });
        }
    }

    private addArray(args: Arg[], depth: number) {
        if (depth >= MAX_DEPTH) {
            throw new Error(`The argument array is nested over ${MAX_DEPTH} times`);
        }
        args.forEach((arg) => {
            if (Array.isArray(arg)) {
                this.addArray(arg, depth + 1);
            } else if (typeof arg === 'string') {
                this.addString(arg);
            }
        });
    }

    add(...args: Arg[]) {
        this.addArray(args, 0);
        return this;
    }

    build() {
        if (this.classNames.size === 0) {
            return null;
        }
        return Array.from(this.classNames).sort().join(' ');
    }
}

export const classNames = (...args: Arg[]) => {
    return new ClassNames(args);
};
