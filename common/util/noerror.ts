export default function SuppressErrors(func: Function, onError = (error: any) => { }) {
    const wrapped = function () {
        try {
            return func.apply(this, arguments);
        } catch (error) {
            onError(error);
        }
    };

    Object.assign(wrapped, func);

    wrapped.toString = () => func.toString();

    return wrapped;
};