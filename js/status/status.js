/**
 * Status
 */
(function(ns) {

    var STATUS_UP_PADDING = 90 - (ns.SCREEN_HEIGHT-50)/2;
    var STATUS_LEFT_PADDING = 0;
    var STATUS_BETWEEN_PADDING = 35;

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "statusLevel",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusName",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusHP",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*2),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusMP",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*3),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusEXP",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*4),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusSTR",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*5),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusDEF",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*6),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusAGI",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*7),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusLUK",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*8),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusVIT",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*9),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusDEX",
                x: STATUS_LEFT_PADDING,
                y: STATUS_UP_PADDING + (STATUS_BETWEEN_PADDING*10),
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            }]
        }
    };

    ns.Status = tm.createClass({
        superClass : tm.app.Shape,

        init: function(parent) {
            this.superInit(ns.SCREEN_WIDTH-50, ns.SCREEN_HEIGHT-100);
            this.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            this.backgroundColor = "rgba(55, 120, 220, 0.5)";
            this.alpha = 1.0;
            
            this.interaction.enabled = true;
            this.interaction.boundingType = "rect";
            this._refresh();

            // プレーヤー
            this.player = parent.player;

            // ステータス終了ボタン
            var endButton = tm.app.GlossyButton(150, 60, "blue", "終了");
            endButton.position.set(ns.SCREEN_WIDTH-150, 80);
            this.endButton = endButton;
            endButton.addEventListener("pointingend", function(e) {
                e.app.popScene();
            });

            // 画像
            var face = ns.Face(parent);
            face.position.set(170, 200);

            // 武器選択
            var weaponButton = tm.app.GlossyButton(280, 60, "gray", "装備無し");
            weaponButton.setPosition(200, 500);
            this.weaponButton = weaponButton;

            // メニューボタン押下時の動作
            this.weaponButton.addEventListener("pointingend", function(e) {
                // メニューボタンが押されたらプルダウンを行う
                var mouse_position = e.app.pointing;
                if (this.isHitPointRect(mouse_position.x, mouse_position.y)) {

                    // 表示するデータを作成
                    var pickerData = {"装備無し": ""};
                    for (var i = 0; i < parent.player.getItem().length; ++i) {
                        pickerData[parent.player.getItem()[i].name] = parent.player.getItem()[i];
                    }
                    e.app.pushScene(ns.iPhonePicker(this, pickerData));
                }
            });

            // 画面に追加
            parent.addChild(this);
            parent.addChild(endButton);
            parent.addChild(weaponButton);
            parent.addChild(face);

            // ステータス表示
            this.fromJSON(UI_DATA.LABELS);
            this._drawStatus();

            console.dir(this.player.getItem());
        },

        _drawStatus: function () {
            this.statusLevel.text = "Lv."  + this.player.getLevel();
            this.statusName.text  = "Name";// + this.player.getLevel();
            this.statusEXP.text   = "EXP " + this.player.getEXP() + "/" + this.player.getNextLevel();
            this.statusHP.text    = "HP "  + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP "  + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
            this.statusSTR.text   = "STR " + this.player.getSTR();
            this.statusDEF.text   = "DEF " + this.player.getDEF();
            this.statusAGI.text   = "AGI " + this.player.getAGI();
            this.statusLUK.text   = "LUK " + this.player.getLUK();
            this.statusVIT.text   = "VIT " + this.player.getVIT();
            this.statusDEX.text   = "DEX " + this.player.getDEX();
        },
        
        _refresh: function() {
            // ボタン描画
            var c = this.canvas;
            c.resize(this.width, this.height);
            c.fillStyle = this.backgroundColor;
            c.fillRoundRect(2, 2, this.width-4, this.height-4, 10);
            c.strokeStyle   = "rgba(100,100,100,0.75)";
            c.lineWidth     = 2;
            c.strokeRoundRect(2, 2, this.width-4, this.height-4, 10);
        },
    });
})(game);