const Error = require("../../models/Error");

async function errorLogger({ message, stack, repository, url }) {
    try {
        const existingError = await Error.findOne({ repository, message, stack, url });
        if (existingError !== null) {
            const { _id } = existingError;
            const e = await Error.updateOne({ _id }, { $inc: { count: 1 } });
        } else {
            await Error.create({ repository, message, stack, url });
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function actionError() {

}

module.exports = {
    actionError,
    errorLogger
}