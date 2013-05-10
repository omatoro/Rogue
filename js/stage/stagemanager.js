/**
 * StageManager
 */
(function(ns) {

	ns.StageManager = tm.createClass({
		init: function (stageNum, enemyGroup, map) {
			// 敵を生成して返す
			var ENEMY_NUM = 80; // 敵の出現数
            for (var i = 0; i < ENEMY_NUM; ++i) {
                var enemy = ns.RedBat();
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