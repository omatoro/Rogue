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
		},

		update: function (app) {
			// マップ移動
			this._move(app);
		},

        initMapPosition: function (initPosition) {
            // プレイヤーの位置を別として保持
            this.playerPosition = tm.geom.Vector2(
                this.width/2  + (ns.SCREEN_WIDTH/2  - initPosition.x),
                this.height/2 + (ns.SCREEN_HEIGHT/2 - initPosition.y) + PLAYER_POSITION_Y);
            this.playerVelocity = tm.geom.Vector2(0, 0);

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

        sceneToMap: function (x, y) {
            ;
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

            // マップヒット判定
			// 所属しているマップチップを取得
			var chip = this.getBelong(this.playerPosition.x, this.playerPosition.y);
			// 所属しているマップチップのrectを取得
			var chipRect = this.getRect(chip.col, chip.row);
			// 上下左右のマップチップのcollisionを取得
			var crossCollision = this.getCrossCollision(chip.col, chip.row);
            // 移動量を取得
            this.playerVelocity = this.velocity.clone();
            this.playerVelocity.x *= -1;
            this.playerVelocity.y *= -1;
            var movingAmount = tm.geom.Vector2.mul(this.playerVelocity, this.speed);
            // 移動後の位置が衝突しているか
            if (crossCollision.up === null || crossCollision.up === 0) {
            	var movedY = this.playerPosition.y + movingAmount.y;
            	if (movedY < chipRect.up)   { this.playerVelocity.y = 0; } // とりあえず移動させない(マップぴったりに合わせたほうがいいかも)
            }
            if (crossCollision.down === null || crossCollision.down === 0) {
            	var movedY = this.playerPosition.y + movingAmount.y;
            	if (movedY > chipRect.down) { this.playerVelocity.y = 0; }
            }
            if (crossCollision.left === null || crossCollision.left === 0) {
            	var movedX = this.playerPosition.x + movingAmount.x;
            	if (movedX < chipRect.left) { this.playerVelocity.x = 0; }
            }
            if (crossCollision.right === null || crossCollision.right === 0) {
            	var movedX = this.playerPosition.x + movingAmount.x;
            	if (movedX > chipRect.right) { this.playerVelocity.x = 0; }
            }

            // プレイやーの位置を更新
            this.playerPosition.add(tm.geom.Vector2.mul(this.playerVelocity, this.speed));
            // マップ位置を更新
            this.playerVelocity.x *= -1;
            this.playerVelocity.y *= -1;
            this.velocity = this.playerVelocity.clone();
            this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));

            this.speed = 0;
		},

	});

})(game);