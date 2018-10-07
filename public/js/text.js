class Text {
    constructor(scene, text, x, y, size, shouldFadeOut, fadeInRate) {
        this.fadingIn = false
        this.shouldFadeOut = shouldFadeOut

        this.sceneText = scene.add.text(x, y, text, { fontSize: size, fill: '#ffffff' });
        this.sceneText.setFontFamily('font1');
        this.sceneText.setAlpha(0.0)
        this.sceneText.depth = 15
        this.fadeInRate = fadeInRate
    }

    startFadeIn() {
        this.fadingIn = true
    }

    setText(text) {
        this.sceneText.setText(text)
    }

    update() {

        this.alpha = this.sceneText.alpha

        if(this.fadingIn  && this.sceneText.alpha != 1.0) {
            this.sceneText.setAlpha(this.sceneText.alpha + this.fadeInRate)
        } else if (this.shouldFadeOut && !this.fadingIn) {
            this.sceneText.setAlpha(this.sceneText.alpha - 0.002)
        }

        if(this.sceneText.alpha == 1) {
            this.fadingIn = false
        }

    }
}
