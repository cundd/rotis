/**
 * Created by daniel on 04/08/16.
 */
export default class {
    prepare() {
        this._lockScrolling();
    }

    _lockScrolling() {
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    }
}
