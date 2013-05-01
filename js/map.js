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

	ns.Map = tm.createClass({
		superClass : ns.MapSprite,

		init: function (pad, initPosition) {
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

            // キャラではなくマップが移動する 加速度
            this.velocity = tm.geom.Vector2(0, 0);

            // padがあれば追加する
            this.pad = pad || false;

            // 移動スピード
            this.speed = 0;

            // プレイヤーの位置を別として保持
            this.playerPosition = tm.geom.Vector2(
            	this.width/2  + (ns.SCREEN_WIDTH/2  - initPosition.x),
            	this.height/2 + (ns.SCREEN_HEIGHT/2 - initPosition.y) + 32);
            this.playerVelocity = tm.geom.Vector2(0, 0);

            // ポジションのセット
            this.position.set(initPosition.x, initPosition.y);
		},

		update: function (app) {
			// マップ移動
			this._move(app);


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
            else if (crossCollision.down === null || crossCollision.down === 0) {
            	var movedY = this.playerPosition.y + movingAmount.y;
            	if (movedY > chipRect.down) { this.playerVelocity.y = 0; }
            }
            if (crossCollision.left === null || crossCollision.left === 0) {
            	var movedX = this.playerPosition.x + movingAmount.x;
            	if (movedX < chipRect.left) { this.playerVelocity.x = 0; }
            }
            else if (crossCollision.right === null || crossCollision.right === 0) {
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