/**
 * Map
 */
(function(ns) {

    // コマ送りアニメーションの基本的な書式を利用
    var IMAGE_WIDTH  = 16;
    var IMAGE_HEIGHT = 80;
    var IMAGE_DIVIDE_COLUMN = 1;
    var IMAGE_DIVIDE_ROW    = 5;
    var CHIP_WIDTH     = IMAGE_WIDTH;
    var CHIP_HEIGHT    = IMAGE_HEIGHT/IMAGE_DIVIDE_ROW;

    // PLAYERの位置を微調整(マップのヒット判定を綺麗に行うため)
    var PLAYER_POSITION_Y = 48;

    // どこに衝突しているか
    var HIT_UP    = 0x01;
    var HIT_DOWN  = 0x02;
    var HIT_LEFT  = 0x04;
    var HIT_RIGHT = 0x08;

	ns.Map = tm.createClass({
		superClass : ns.MapSprite,

		init: function (pad) {
			// マップの自動生成
			var map = ns.GenerateMap();

			// マップデータの作成
			var mapchip = ns.MapChip({
                chips: {
                	0: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Dirt1_pipo",  count: 5},
                	1: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Water2_pipo", count: 5},
                	2: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Grass1_pipo", count: 5},
                },
                map: map.map,
                collision: map.collision
            });

            this.superInit(mapchip, 64, 64);

            // 歩ける場所の数
            this.walkMapNum = map.walkMapNum;

            // 歩ける場所に何かを生成したら覚えておく
            this.isCreateSomething = [];

            // キャラではなくマップが移動する 加速度
            this.velocity = tm.geom.Vector2(0, 0);

            // padがあれば追加する
            this.pad = pad || false;

            // 移動スピード
            this.speed = 0;

            // マップ上に敵を設置する場合
            this.isEnemy = false;

            // スクリーン中心にプレイヤーを設置するか
            this.isPlayer = false;
		},

		update: function (app) {
			// マップ移動
			this._move(app);
		},

        setEnemyGroup: function (enemyGroup) {
            this.isEnemy = true;
            this.enemyGroup = enemyGroup;
            this.addChild(enemyGroup); // MAPの中心座標が0,0となる
        },

        setItemGroup: function (itemGroup) {
            this.itemGroup = itemGroup;
            this.addChild(itemGroup); // MAPの中心座標が0,0となる
        },

        setPlayer: function (initPosition) {
            // プレイヤーの位置を別として保持
            this.isPlayer = true;
            this.playerPosition = tm.geom.Vector2(
                this.width/2  + (ns.SCREEN_WIDTH/2  - initPosition.x),
                this.height/2 + (ns.SCREEN_HEIGHT/2 - initPosition.y) + PLAYER_POSITION_Y);
        },

        screenLeftTopToMapCenter: function (x, y) {
            var result = tm.geom.Vector2(x - this.x, y - this.y);
            return result;
        },
        screenLeftTopToMapLeftTop: function (x, y) {
            var toMapCenter = this.screenLeftTopToMapCenter(x, y);
            var result = tm.geom.Vector2(toMapCenter.x + this.width/2, toMapCenter.y + this.height/2);
            return result;
        },
        mapLeftTopToMapCenter: function (x, y) {
            var result = tm.geom.Vector2(-this.width/2 + x, -this.height/2 + y);
            return result;
        },
        mapCenterToMapLeftTop: function (x, y) {
            var result = tm.geom.Vector2(this.width/2 + x, this.height/2 + y);
            return result;
        },
        mapCenterToScreenTopLeft: function (x, y) {
            var result = tm.geom.Vector2(this.x + x, this.y + y);
            return result;
        },
        mapLeftTopToScreenTopLeft: function (x, y) {
            var mapCenter = this.mapLeftTopToMapCenter(x, y);
            var screenTopLeft = this.mapCenterToScreenTopLeft(mapCenter.x, mapCenter.y);
            return screenTopLeft;
        },

        initMapPosition: function (initPosition) {
            // セットしたポジションの初期位置を保持
            this.initPosition = tm.geom.Vector2(initPosition.x, initPosition.y);

            // ポジションのセット
            this.position.set(initPosition.x, initPosition.y);
        },

        /**
         * 歩ける場所からランダムに選んで返す(マップの左上を0,0)
         */
        getRandomSafeMapChipPosition: function () {
            // 既に何かを生成していないか調べる
            var mapPosition = Math.rand(0, this.walkMapNum-1);
            var isBreak = true;
            while (true) {
                for (var i = 0; i < this.isCreateSomething.length; ++i) {
                    if (this.isCreateSomething[i] === mapPosition) {
                        mapPosition = Math.rand(0, this.walkMapNum-1);
                        isBreak = false;
                        break;
                    }
                    else {
                        isBreak = true;
                    }
                }
                if (isBreak && this.isCreateSomething[i] !== mapPosition) {
                    break;
                }
            }

            // 歩ける場所を返す
            var counter = 0;
            for (var i = 0; i < this.mapchip.collision.length; ++i) {
                for (var j = 0; j < this.mapchip.collision[i].length; ++j) {
                    // 歩ける場所かどうか
                    if (this.mapchip.collision[i][j] === 1) {
                        // ランダムに選んだ場所かどうか
                        if (counter === mapPosition) {
                            // ここだ！ マップの左上を0,0とした座標で数値を返す
                            var result = {
                                x: j,
                                y: i
                            };
                            this.isCreateSomething.push(counter);
                            return result;
                        }
                        else {
                            ++counter;
                        }
                    }
                }
            }
        },

		_move: function (app) {
			// 移動方向の取得
            var angle = app.keyboard.getKeyAngle();
            if (angle !== null) {
                this.velocity.setDegree(angle, 1);
                this.velocity.x *= -1;
                // this.velocity.y *= -1;
                this.speed = 6;
            }
            else if (this.pad && this.pad.isTouching) {
                if   (this.pad.angle < 0) {this.pad.angle *= -1;}
                else                      {this.pad.angle = 360 - this.pad.angle;}
                this.velocity.setDegree(this.pad.angle, 1);
                this.velocity.x *= -1;
                this.velocity.y *= -1;
                this.speed = 6;
            }

            // プレイヤーの移動
            if (this.isPlayer) {
                this.velocity = this._playerMove();
            }

            // 敵の移動
            if (this.isEnemy) {
                this._enemyMove();
            }
            
            this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));

            this.speed = 0;
		},

        _enemyMove: function () {
            for (var i = 0; i < this.enemyGroup.children.length; ++i) {
                var velocity = this.enemyGroup.children[i].velocity.clone();
                var position = this.enemyGroup.children[i].position.clone();
                position = this.mapCenterToMapLeftTop(position.x, position.y);
                var speed    = this.enemyGroup.children[i].speed;
                velocity.x *= -1;
                velocity.y *= -1;
                var isHit = this._isHitCollisionMap(
                    position.x,
                    position.y,
                    velocity,
                    speed);
                if (isHit & HIT_UP)    { velocity.y = 0; }
                if (isHit & HIT_DOWN)  { velocity.y = 0; }
                if (isHit & HIT_LEFT)  { velocity.x = 0; }
                if (isHit & HIT_RIGHT) { velocity.x = 0; }

                // 敵の位置を更新
                this.enemyGroup.children[i].position.add(tm.geom.Vector2.mul(velocity, speed));
            }
        },

        _playerMove: function () {
            var playerVelocity = this.velocity.clone();
            playerVelocity.x *= -1;
            playerVelocity.y *= -1;
            var isHit = this._isHitCollisionMap(
                this.playerPosition.x,
                this.playerPosition.y,
                playerVelocity,
                this.speed);
            if (isHit & HIT_UP)    { playerVelocity.y = 0; }
            if (isHit & HIT_DOWN)  { playerVelocity.y = 0; }
            if (isHit & HIT_LEFT)  { playerVelocity.x = 0; }
            if (isHit & HIT_RIGHT) { playerVelocity.x = 0; }

            // プレイやーの位置を更新
            this.playerPosition.add(tm.geom.Vector2.mul(playerVelocity, this.speed));

            // プレイヤーがいたらマップチップとのヒット判定を行うので、マップ移動用に移動量を返す
            playerVelocity.x *= -1;
            playerVelocity.y *= -1;
            return playerVelocity.clone();
        },

        _isHitCollisionMap: function (x, y, velocity, speed) {
            // 返す値
            var result = 0x00;
            // 所属しているマップチップを取得
            var chip = this.getBelong(x, y);
            // 所属しているマップチップのrectを取得
            var chipRect = this.getRect(chip.col, chip.row);
            // 上下左右のマップチップのcollisionを取得
            var crossCollision = this.getCrossCollision(chip.col, chip.row);
            // 移動量を取得
            var movingAmount = tm.geom.Vector2.mul(velocity, speed);
            // 移動後の位置が衝突しているか
            if (crossCollision.up === null || crossCollision.up === 0) {
                var movedY = y + movingAmount.y;
                if (movedY < chipRect.up)   { result |= HIT_UP; } // とりあえず移動させない(マップぴったりに合わせたほうがいいかも)
            }
            if (crossCollision.down === null || crossCollision.down === 0) {
                var movedY = y + movingAmount.y;
                if (movedY > chipRect.down) { result |= HIT_DOWN; }
            }
            if (crossCollision.left === null || crossCollision.left === 0) {
                var movedX = x + movingAmount.x;
                if (movedX < chipRect.left) { result |= HIT_LEFT; }
            }
            if (crossCollision.right === null || crossCollision.right === 0) {
                var movedX = x + movingAmount.x;
                if (movedX > chipRect.right) { result |= HIT_RIGHT; }
            }
            return result;
        },

	});

})(game);