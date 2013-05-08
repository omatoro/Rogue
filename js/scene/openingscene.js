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
            var player = ns.Player(pad);
            this.player = player;
            player.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            // マップ
            var map = ns.Map(pad);
            this.map = map;
            // 取得した位置をスクリーンの中心になるようにマップの中心座標を設定する
            var safePosition = map.getRandomSafeMapChipPosition(); // 場所を取得
            safePosition = map.mapLeftTopToMapCenter(
                safePosition.x * map.mapChipWidth  + map.mapChipWidth/2,
                safePosition.y * map.mapChipHeight);
            // マップの中心位置を計算する(safePositionがスクリーンの中心に来るように)
            safePosition.x = ns.SCREEN_WIDTH/2  - safePosition.x;
            safePosition.y = ns.SCREEN_HEIGHT/2 - safePosition.y;
            map.initMapPosition(safePosition);
            map.setPlayer(safePosition);

            // アイテム
            var itemList   = ns.ItemList();
            var itemGroup  = tm.app.CanvasElement();
            this.itemGroup = itemGroup;
            map.setItemGroup(itemGroup);

            // 敵
            var enemyGroup = tm.app.CanvasElement();
            this.enemyGroup = enemyGroup;
            var ENEMY_NUM = 80; // 敵の出現数
            for (var i = 0; i < ENEMY_NUM; ++i) {
                var enemy = ns.Enemy();
                // Sceneの座標に変換
                var safeEnemyPosition = map.getRandomSafeMapChipPosition();
                safeEnemyPosition = map.mapLeftTopToMapCenter(
                    safeEnemyPosition.x * map.mapChipWidth  + map.mapChipWidth/2,
                    safeEnemyPosition.y * map.mapChipHeight);

                enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
                enemyGroup.addChild(enemy);
            }
            // 敵をマップに追加
            map.setEnemyGroup(enemyGroup);

            // 攻撃時のエフェクト
            var ss = tm.app.SpriteSheet({
                image: "slash",
                frame: {
                    width:  65,
                    height: 65,
                    count: 8
                },
                animations: {
                    "slash": [0, 8]
                }
            });
            var slash = tm.app.AnimationSprite(120, 120, ss)
            // this.slash = slash;
            slash.position.set(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);

            // 攻撃ボタン
            var attackButton = tm.app.GlossyButton(100, 60, "green", "攻撃");
            attackButton.position.set(ns.SCREEN_WIDTH-50-50, ns.SCREEN_HEIGHT-30-50);
            this.attackButton = attackButton;
            attackButton.addEventListener("pointingend", function(e) {
                // 攻撃の方向を調べる
                var attackAngle = player.attack();
                var attackVelocity = tm.geom.Vector2(0,0).setDegree(attackAngle, 1);
                attackVelocity.y *= -1;
                // 攻撃の場所を計算する()画面上
                var distanse = 100;
                var attackScreenPosition = player.position.clone().add(tm.geom.Vector2.mul(attackVelocity, distanse));

                // 攻撃時のアニメーション
                slash.position.set(attackScreenPosition.x, attackScreenPosition.y);
                slash.gotoAndPlay("slash");

                // 攻撃するポイントを作成
                var attackMapPosition = map.playerPosition.clone().add(tm.geom.Vector2.mul(attackVelocity, distanse));
                attackMapPosition = map.mapLeftTopToMapCenter(attackMapPosition.x, attackMapPosition.y-20);
                var attackElement = tm.app.Object2D();
                attackElement.radius = 20;
                attackElement.position.set(attackMapPosition.x, attackMapPosition.y);
                // console.dir("centerX " + attackElement.centerX + " centerY " + attackElement.centerY + " radius " + attackElement.radius);

                // 攻撃が当たっているか調べる
                for (var i = 0; i < enemyGroup.children.length; ++i) {
                    var enemy = enemyGroup.children[i];
                    var position = enemy.position.clone();
                    if (enemy.isHitElementCircle(attackElement)) {
                        // ダメージ数を計算
                        var attack = player.getAttackPoint();
                        var damage = enemy.damage(attack);

                        // ダメージ数を表示
                        var damageEffect = ns.DamagedNumber(damage);

                        // 経験値取得
                        var exp = enemy.getExp();
                        player.addExp(exp);

                        // アイテムドロップ
                        var itemData = itemList.get(enemy.getDropItem());
                        if (itemData !== null) {
                            var dropItem = ns.DropItem(itemData);
                            dropItem.position.set(enemy.x, enemy.y);
                            map.addItem(dropItem);
                        }

                        // 表示場所を設定
                        var damagePosition = map.mapCenterToScreenTopLeft(enemy.x, enemy.y);
                        damageEffect.effectPositionSet(damagePosition.x + 10, damagePosition.y + 5);
                        e.app.currentScene.addChild(damageEffect);
                    }
                }
            });

            // 画面に追加
            this.addChild(map);
            this.addChild(pad);
            this.addChild(player);
            this.addChild(slash);
            this.addChild(attackButton);

            // ステータス表示
            this.fromJSON(UI_DATA.LABELS);
        },

        screenLeftTopToCenter: function (x, y) {
            var result = tm.geom.Vector2(x - ns.SCREEN_WIDTH/2, y - ns.SCREEN_HEIGHT/2);
            return result;
        },
        screenCenterToLeftTop: function (x, y) {
            var result = tm.geom.Vector2(x + ns.SCREEN_WIDTH/2, y + ns.SCREEN_HEIGHT/2);
            return result;
        },

        drawStatus: function () {
            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        },

        update : function(app) {

            // // プレイヤーの攻撃
            // if () {
            //     ;
            // }

            // ステータスの描画
            this.drawStatus();
        }
    });

})(game);