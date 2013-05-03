/**
 * オープニング画面
 */
(function(ns) {

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "statusLevel",
                x: 40,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            },{
                type: "Label",
                name: "statusHP",
                x: 160,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            },{
                type: "Label",
                name: "statusMP",
                x: 380,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            }]
        }
    };

    ns.OpeningScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(backnum, speed, speedName, questnum) {
            this.superInit();

            // コントローラーパッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);

            // プレイヤー
            this.player = ns.Player(pad);
            this.player.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            // マップ
            this.map = ns.Map(pad);
            // 取得した位置をスクリーンの中心になるようにマップの中心座標を設定する
            var safePosition = this.map.getRandomSafeMapChipPosition(); // 場所を取得
            safePosition = this.map.mapLeftTopToMapCenter(
                safePosition.x * this.map.mapChipWidth  + this.map.mapChipWidth/2,
                safePosition.y * this.map.mapChipHeight);
            // マップの中心位置を計算する(safePositionがスクリーンの中心に来るように)
            safePosition.x = ns.SCREEN_WIDTH/2  - safePosition.x;
            safePosition.y = ns.SCREEN_HEIGHT/2 - safePosition.y;
            this.map.initMapPosition(safePosition);
            this.map.setPlayer(safePosition);

            // 敵
            this.enemyGroup = tm.app.CanvasElement();
            var ENEMY_NUM = 80; // 敵の出現数
            for (var i = 0; i < ENEMY_NUM; ++i) {
                var enemy = ns.Enemy();
                // Sceneの座標に変換
                var safeEnemyPosition = this.map.getRandomSafeMapChipPosition();
                safeEnemyPosition = this.map.mapLeftTopToMapCenter(
                    safeEnemyPosition.x * this.map.mapChipWidth  + this.map.mapChipWidth/2,
                    safeEnemyPosition.y * this.map.mapChipHeight);

                enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
                this.enemyGroup.addChild(enemy);
            }
            // 敵をマップに追加
            this.map.setEnemyGroup(this.enemyGroup);

            // 攻撃時のエフェクト
            var ss = tm.app.SpriteSheet({
                image: "slash",
                frame: {
                    width: 65,
                    height: 65,
                    count: 8
                },
                animations: {
                    "slash": [0, 8]
                }
            });
            this.slash = tm.app.AnimationSprite(120, 120, ss);
            this.slash.position.set(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);

            // 画面に追加
            this.addChild(this.map);
            this.addChild(pad);
            this.addChild(this.player);
            this.addChild(this.slash);

            // ステータス表示
            this.fromJSON(UI_DATA.LABELS);
            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        },

        screenLeftTopToCenter: function (x, y) {
            var result = tm.geom.Vector2(x - ns.SCREEN_WIDTH/2, y - ns.SCREEN_HEIGHT/2);
            return result;
        },
        screenCenterToLeftTop: function (x, y) {
            var result = tm.geom.Vector2(x + ns.SCREEN_WIDTH/2, y + ns.SCREEN_HEIGHT/2);
            return result;
        },

        update : function(app) {
            if (app.pointing.getPointingEnd()) {
                this.slash.gotoAndPlay("slash");

                // ダメージ数を計算
                var attack = Math.rand(1, 100);
                var damage = this.player.damage(attack);

                // ダメージ数を表示
                var damageEffect = ns.DamagedNumber(damage);
                damageEffect.effectPositionSet(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);
                this.addChild(damageEffect);
            }

            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        }
    });

})(game);