/**
 * StageManager
 */
(function(ns) {

	ns.StageManager = tm.createClass({
		init: function (stageNum, enemyGroup, player, map) {
			switch (stageNum) {
                case 1:
                    this._createEnemy(enemyGroup, player, map, ns.RedBat, 50);
            }
		},

        _createEnemy: function (enemyGroup, player, map, enemyClass, num) {
            // 敵を生成して返す
            for (var i = 0; i < num; ++i) {
                // enemyを作成
                var enemy = enemyClass(player, map);
                // Sceneの座標に変換
                var safeEnemyPosition = map.getRandomSafeMapChipPosition();
                safeEnemyPosition = map.mapLeftTopToMapCenter(
                    safeEnemyPosition.x * map.mapChipWidth + map.mapChipWidth/2,
                    safeEnemyPosition.y * map.mapChipHeight);

                enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
                enemyGroup.addChild(enemy);
            }
        },
	});

})(game);