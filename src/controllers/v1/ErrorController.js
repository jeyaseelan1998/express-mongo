const Error = require("../../models/Error");

async function errorLogger({ message, stack, repository }) {
    try {
        const existingError = await Error.findOne({ repository, message, stack });
        if (existingError !== null) {
            const { _id } = existingError;
            const e = await Error.updateOne({ _id }, { $inc: { count: 1 } });
        } else {
            await Error.create({ repository, message, stack });
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