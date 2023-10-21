import carbone from "carbone";

export function templateWrite(templateLocation, content) {
    return new Promise(function(resolve, reject) {
        carbone.render(templateLocation, content, {}, function (error, result) {
            if (error) return reject(error);

            resolve(result);
        });
    });
}