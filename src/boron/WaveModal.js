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
            animationDuration: '1s',
            animationTimingFunction: 'linear'
        },
        hide: {
            animationDuration: '0.3s',
            animationTimingFunction: 'ease-out'
        },
        showContentAnimation: insertKeyframesRule({
            '0%': {
                opacity: 0,
                transform: 'matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '2.083333%': {
                transform: 'matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '4.166667%': {
                transform: 'matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '6.25%': {
                transform: 'matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '8.333333%': {
                transform: 'matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '10.416667%': {
                transform: 'matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '12.5%': {
                transform: 'matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '14.583333%': {
                transform: 'matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '16.666667%': {
                transform: 'matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '18.75%': {
                transform: 'matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '20.833333%': {
                transform: 'matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '22.916667%': {
                transform: 'matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '25%': {
                transform: 'matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '27.083333%': {
                transform: 'matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '29.166667%': {
                transform: 'matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '31.25%': {
                transform: 'matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '33.333333%': {
                transform: 'matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '35.416667%': {
                transform: 'matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '37.5%': {
                transform: 'matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '39.583333%': {
                transform: 'matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '41.666667%': {
                transform: 'matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '43.75%': {
                transform: 'matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '45.833333%': {
                transform: 'matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '47.916667%': {
                transform: 'matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '50%': {
                opacity: 1,
                transform: 'matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '52.083333%': {
                transform: 'matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '54.166667%': {
                transform: 'matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '56.25%': {
                transform: 'matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '58.333333%': {
                transform: 'matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '60.416667%': {
                transform: 'matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '62.5%': {
                transform: 'matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '64.583333%': {
                transform: 'matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '66.666667%': {
                transform: 'matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '68.75%': {
                transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '70.833333%': {
                transform: 'matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '72.916667%': {
                transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '75%': {
                transform: 'matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '77.083333%': {
                transform: 'matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '79.166667%': {
                transform: 'matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '81.25%': {
                transform: 'matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '83.333333%': {
                transform: 'matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '85.416667%': {
                transform: 'matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '87.5%': {
                transform: 'matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '89.583333%': {
                transform: 'matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '91.666667%': {
                transform: 'matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '93.75%': {
                transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '95.833333%': {
                transform: 'matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '97.916667%': {
                transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            },
            '100%': {
                opacity: 1,
                transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
            }
        }),

        hideContentAnimation: insertKeyframesRule({
            '0%': {
                opacity: 1
            },
            '100%': {
                opacity: 0,
                transform: 'scale3d(0.8, 0.8, 1)'
            },
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
            transform: hasTransform3D ? "translate3d(-50%, -50%, 0)" : "translate(-50%,-50%)",
            top: "50%",
            left: "50%"
        })
    },
    getBackdropStyle: function (willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            backgroundColor: "#373A47",
            animationFillMode: 'forwards',
            animationDuration: '0.3s',
            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        });
    },
    getContentStyle: function (willHidden) {
        return appendVendorPrefix({
            margin: 0,
            backgroundColor: "white",
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideContentAnimation : showContentAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        })
    }
});