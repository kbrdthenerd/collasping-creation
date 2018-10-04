class Text {
    constructor(scene, text, x, y, size, shouldFadeOut) {
        this.fadingIn = false
        this.shouldFadeOut = shouldFadeOut

        this.sceneText = scene.add.text(x, y, text, { fontSize: size, fill: '#ffffff' });
        this.sceneText.setFontFamily('font1');
        this.sceneText.setAlpha(0.0)
        this.sceneText.depth = 15
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
            this.sceneText.setAlpha(this.sceneText.alpha + 0.001)
        } else if (this.shouldFadeOut && !this.fadingIn && this.sceneText.alpha !=0 ) {
            this.sceneText.setAlpha(this.sceneText.alpha - 0.001)
        }

        if(this.sceneText.alpha == 1) {
            this.fadingIn = false
        }

    }
}
