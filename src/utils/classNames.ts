type Arg = undefined | null | string | Arg[];

class ClassNames {
    private classNames = new Set<string>();

    constructor(...args: Arg[]) {
        this.addArray(args);
    }

    private addSingle(arg: string) {
        const className = arg.trim();
        if (className.length > 0) {
            this.classNames.add(className);
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

    private addArray(args: Arg[]) {
        args.forEach((arg) => {
            if (Array.isArray(arg)) {
                this.addArray(arg);
            } else if (typeof arg === 'string') {
                this.addString(arg);
            }
        });
    }

    add(...args: Arg[]) {
        this.addArray(args);
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
