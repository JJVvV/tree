var React = require('react');
var transitionEvents = require('react-kit/transitionEvents');
var $ = require("jquery");

module.exports = function (animation) {

    return React.createClass({
        propTypes: {
            className: React.PropTypes.string,
            // Close the modal when esc is pressed? Defaults to true.
            keyboard: React.PropTypes.bool,
            onShow: React.PropTypes.func,
            onHide: React.PropTypes.func,
            animation: React.PropTypes.object,
            backdrop: React.PropTypes.oneOfType([
                React.PropTypes.bool,
                React.PropTypes.string
            ])
        },

        getDefaultProps: function () {
            return {
                className: "",
                onShow: function () { },
                onHide: function () { },
                animation: animation,
                keyboard: true,
                backdrop: true
            };
        },

        getInitialState: function () {
            return {
                willHidden: false,
                hidden: true
            }
        },

        hasHidden: function () {
            return this.state.hidden;
        },

        //componentDidMount: function(){
        //    var ref = this.props.animation.getRef();
        //    var node = this.refs[ref].getDOMNode();
        //    var endListener = function(e) {
        //        if (e && e.target !== node) {
        //            return;
        //        }
        //        transitionEvents.removeEndEventListener(node, endListener);
        //        this.enter();

        //    }.bind(this);
        //    transitionEvents.addEndEventListener(node, endListener);
        //},

        render: function () {

            var hidden = this.hasHidden();
            if (hidden) return null;

            var willHidden = this.state.willHidden;
            var animation = this.props.animation;
            var modalStyle = animation.getModalStyle(willHidden);
            var backdropStyle = animation.getBackdropStyle(willHidden);
            var contentStyle = animation.getContentStyle(willHidden);
            var ref = animation.getRef(willHidden);
            var sharp = animation.getSharp && animation.getSharp(willHidden);
            var backdrop = this.props.backdrop ? React.createElement("div", { onClick: this.hide, style: backdropStyle }) : undefined;

            if (willHidden) {
                var node = this.refs[ref].getDOMNode();
                var endListener = function (e) {
                    if (e && e.target !== node) {
                        return;
                    }
                    try {
                        transitionEvents.removeEndEventListener(node, endListener);
                    } catch (e) { }
                    this.leave();

                }.bind(this);
                try {
                    transitionEvents.addEndEventListener(node, endListener);
                } catch (e) { }
            }

            return (React.createElement("div", { style: { position: "absolute" } },
                React.createElement("div", { ref: "modal", style: modalStyle, className: this.props.className },
                    React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle", textAlign: "center" } },
                        sharp,
                        React.createElement("div", { ref: "content", tabIndex: "-1", style: contentStyle },
                            React.cloneElement(this.props.children)
                        ),
                        backdrop
                    )
                )
             ))
            ;
        },

        leave: function () {
            this.setState({
                hidden: true
            });
            this.props.onHide();
        },

        enter: function () {
            this.props.onShow();
        },

        show: function () {
            if (!this.hasHidden()) return;

            this.setState({
                willHidden: false,
                hidden: false
            });
        },

        hide: function () {
            if (this.hasHidden()) return;

            this.setState({
                willHidden: true
            });
        },

        toggle: function () {
            if (this.hasHidden())
                this.show();
            else
                this.hide();
        },

        listenKeyboard: function (event) {
            if (this.props.keyboard &&
                    (event.key === "Escape" ||
                     event.keyCode === 27)) {
                this.hide();
            }
        },

        componentDidMount: function () {
            try {
                window.addEventListener("keydown", this.listenKeyboard, true);
            } catch (e) {
                $(window).on("keydown", this.listenKeyboard);
            }
        },

        componentWillUnmount: function () {
            try {
                window.removeEventListener("keydown", this.listenKeyboard, true);
            } catch (e) {
                $(window).off("keydown", this.listenKeyboard);
            }
        },

    });

}
