var modalFactory = require('./modalFactory');
var insertKeyframesRule;
try {
    insertKeyframesRule = require('react-kit/insertKeyframesRule');
} catch (e) {
    insertKeyframesRule = function () { };
}
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var hasTransform3D = require("./Support").transform3D;

var animation;
try {
    animation = {
        show: {
            animationDuration: '0.3s',
            animationTimingFunction: 'ease-out'
        },
        hide: {
            animationDuration: '0.3s',
            animationTimingFunction: 'ease-out'
        },
        showContentAnimation: insertKeyframesRule({

            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 1
            }
        }),

        hideContentAnimation: insertKeyframesRule({
            '0%': {
                opacity: 1
            },
            '100%': {
                opacity: 0
            }
        }),

        showBackdropAnimation: insertKeyframesRule({
            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 0.9
            },
        }),

        hideBackdropAnimation: insertKeyframesRule({
            '0%': {
                opacity: 0.9
            },
            '100%': {
                opacity: 0
            }
        })
    };
} catch (e) {
    animation = { show: {}, hide: {} };
}
var showAnimation = animation.show;
var hideAnimation = animation.hide;
var showContentAnimation = animation.showContentAnimation;
var hideContentAnimation = animation.hideContentAnimation;
var showBackdropAnimation = animation.showBackdropAnimation;
var hideBackdropAnimation = animation.hideBackdropAnimation;

module.exports = modalFactory({
    getRef: function (willHidden) {
        return 'content';
    },
    getModalStyle: function (willHidden) {
        return appendVendorPrefix({
            zIndex: 1050,
            position: "fixed",
            //width: "500px",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "table"
        });
    },
    getBackdropStyle: function (willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#373A47",
            animationFillMode: 'forwards',
            animationDuration: '0.3s',
            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        });
    },
    getContentStyle: function (willHidden) {
        return appendVendorPrefix({
            margin: "0 auto",
            borderRadius: "5px",
            backgroundColor: "white",
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideContentAnimation : showContentAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction,
            display: "inline-block",
            textAlign: "left",
            zIndex: 1,
            position: "relative"
        })
    }
});
