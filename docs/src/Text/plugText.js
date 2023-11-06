class DialogModal {
  constructor(scene) {
    this.scene = scene;
    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }

    this.borderThickness = 3;
    this.borderColor = 0x907748;
    this.borderAlpha = 1;
    this.windowAlpha = 0.8;
    this.windowColor = 0x303030;
    this.windowHeight = 150;
    this.padding = 32;
    this.closeBtnColor = 'darkgoldenrod';
    this.dialogSpeed = 4;
    this.eventCounter = 0;
    this.visible = true;
    this.text = undefined;
    this.dialog = undefined;
    this.graphics = undefined;
    this.closeBtn = undefined;
    this.fontSize = 36;

  }

  boot() {
    const eventEmitter = this.systems.events;
    eventEmitter.on('destroy', this.destroy, this);
  }

  shutdown() {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  }

  destroy() {
    this.shutdown();
    this.scene = undefined;
  }

  init(opts = {}) {
    this.borderThickness = opts.borderThickness || this.borderThickness;
    this.borderColor = opts.borderColor || this.borderColor;
    this.borderAlpha = opts.borderAlpha || this.borderAlpha;
    this.windowAlpha = opts.windowAlpha || this.windowAlpha;
    this.windowColor = opts.windowColor || this.windowColor;
    this.windowHeight = opts.windowHeight || this.windowHeight;
    this.padding = opts.padding || this.padding;
    this.closeBtnColor = opts.closeBtnColor || this.closeBtnColor;
    this.dialogSpeed = opts.dialogSpeed || this.dialogSpeed;

    this._createWindow();
  }

  toggleWindow() {
    this.visible = !this.visible;
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.closeBtn) this.closeBtn.visible = this.visible;
  }

  _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  }

  setText(text, animate = false) {
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();

    const tempText = animate ? '' : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText.bind(this),
        loop: true
      });
    }
  }

  _setText(text) {
    if (this.text) this.text.destroy();

    const x = this.padding + 10;
    const y = this._getGameHeight() - this.windowHeight - this.padding + 10;

    this.text = this.scene.make.text({
        x,
        y,
        text,
        style: {
            font: `${this.fontSize}px Arial`,
            wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
        }
    });
}

_createCloseModalButton() {
    const self = this;
    this.closeBtn = this.scene.make.text({
        x: this._getGameWidth() - this.padding - 14,
        y: this._getGameHeight() - this.windowHeight - this.padding + 3,
        text: 'X',
        style: {
            font: `bold ${this.fontSize}px Arial`,
            fill: this.closeBtnColor
        }
    });
  }

  doubleFontSize() {
    this.fontSize *= 2;

    // Actualiza el texto y el botón con el nuevo tamaño
    if (this.text) {
        this._setText(this.text.text);
    }

    if (this.closeBtn) {
        this._createCloseModalButton();
    }
  }

  _createWindow() {
    const gameWidth = this._getGameWidth();
    const gameHeight = this._getGameHeight();
    const windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();

    this._createOuterWindow(windowDimensions);
    this._createInnerWindow(windowDimensions);
    this._createCloseModalButtonBorder();
    this._createCloseModalButton();
  }

  _getGameWidth() {
    return this.scene.sys.game.config.width;
  }

  _getGameHeight() {
    return this.scene.sys.game.config.height;
  }

  _calculateWindowDimensions(width, height) {
    const x = this.padding;
    const y = height - this.windowHeight - this.padding;
    return {
      x,
      y,
      rectWidth: width - (this.padding * 2),
      rectHeight: this.windowHeight
    };
  }

  _createInnerWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  _createOuterWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  _createCloseModalButtonBorder() {
    const x = this._getGameWidth() - this.padding - 20;
    const y = this._getGameHeight() - this.windowHeight - this.padding;
    this.graphics.strokeRect(x, y, 20, 20);
  }

  _createCloseModalButton() {
    const self = this;
    this.closeBtn = this.scene.make.text({
      x: this._getGameWidth() - this.padding - 14,
      y: this._getGameHeight() - this.windowHeight - this.padding + 3,
      text: 'X',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
    this.closeBtn.setInteractive();

    this.closeBtn.on('pointerover', function () {
      this.setTint(0xff0000);
    });
    this.closeBtn.on('pointerout', function () {
      this.clearTint();
    });
    this.closeBtn.on('pointerdown', function () {
      self.toggleWindow();
      if (self.timedEvent) self.timedEvent.remove();
      if (self.text) self.text.destroy();
    });
  }
}

export default DialogModal;