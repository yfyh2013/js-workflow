class ConsoleDriver extends Driver {
    constructor() {
        super();
    }

    store(data) {
        if ('object' === typeof data) {
            console.log(JSON.stringify(data));
        } else {
            if (undefined !== data && undefined !== data.toString) {
                console.log(data.toString());
            } else {
                console.log(data);
            }
        }
    }
}

exports.ConsoleDriver = ConsoleDriver;