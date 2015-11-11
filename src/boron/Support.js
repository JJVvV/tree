module.exports = {
    transform3D: "perspective" in document.body.style || "WebkitPerspective" in document.body.style || "MozPerspective" in document.body.style
};