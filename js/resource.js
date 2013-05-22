/**
 * リソースの読み込み
 */
tm.preload(function() {

	// プレイヤー
	tm.graphics.TextureManager.add("player", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/player.png");
	tm.graphics.TextureManager.add("playerFace", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/char.png");

	// モンスター
	tm.graphics.TextureManager.add("SlimeGreen",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Slime_Green.png");
	tm.graphics.TextureManager.add("SlimeBlue",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Slime_Blue.png");
	tm.graphics.TextureManager.add("SlimeRed",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Slime_Red.png");
	// tm.graphics.TextureManager.add("SlimeGold",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Slime_Gold.png");

	tm.graphics.TextureManager.add("SmallBatBlack",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]SmallBat_Black.png");
	tm.graphics.TextureManager.add("SmallBatGreen",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]SmallBat_Green.png");
	// tm.graphics.TextureManager.add("SmallBatRed",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]SmallBat_Red.png");
	// tm.graphics.TextureManager.add("SmallBatGhost",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]SmallBat_Ghost.png");

	tm.graphics.TextureManager.add("GoblinGrey", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Goblin_Grey.png");
	tm.graphics.TextureManager.add("GoblinGreen", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Goblin_Green.png");
	// tm.graphics.TextureManager.add("GoblinRed", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Goblin_Red.png");

	tm.graphics.TextureManager.add("BatBlack",	 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Bat_Black.png");
	tm.graphics.TextureManager.add("BatGreen",	 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Bat_Green.png");
	// tm.graphics.TextureManager.add("BatBlue",	 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Bat_Blue.png");
	// tm.graphics.TextureManager.add("BatRed",	 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Bat_Red2.png");
	// tm.graphics.TextureManager.add("BatWhite",	 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Bat_White.png");

	tm.graphics.TextureManager.add("SkeltonNormal", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Skelton_Normal.png");
	// tm.graphics.TextureManager.add("SkeltonGreen", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Skelton_Green.png");
	// tm.graphics.TextureManager.add("SkeltonBlue", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Skelton_Blue.png");
	// tm.graphics.TextureManager.add("SkeltonRed", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Skelton_Red.png");

	tm.graphics.TextureManager.add("HarypyNormal",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Harypy_Normal.png");

	tm.graphics.TextureManager.add("LizardManNormal",	"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]LizardMan_Normal.png");
	// tm.graphics.TextureManager.add("LizardManBlue",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]LizardMan_Blue.png");
	// tm.graphics.TextureManager.add("LizardManRed",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]LizardMan_Red.png");

	tm.graphics.TextureManager.add("ZombieNormal",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Zombie_Normal.png");
	// tm.graphics.TextureManager.add("ZombieRed",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Zombie_Red.png");

	// tm.graphics.TextureManager.add("GolemNormal",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Golem_Normal.png");
	// tm.graphics.TextureManager.add("GolemGreen",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Golem_Green.png");
	// tm.graphics.TextureManager.add("GolemBlue",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Golem_Blue.png");
	// tm.graphics.TextureManager.add("GolemRed",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Golem_Red.png");
	// tm.graphics.TextureManager.add("GolemGhost",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Golem_Ghost.png");

	// tm.graphics.TextureManager.add("GhostNormal",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Ghost_Normal.png");

	// tm.graphics.TextureManager.add("GargoyleBlack",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Gargoyle_Black.png");
	// tm.graphics.TextureManager.add("GargoyleRed",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Gargoyle_Red.png");

	tm.graphics.TextureManager.add("DragonGreen",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_Green.png");
	// tm.graphics.TextureManager.add("DragonBlue",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_Blue.png");
	// tm.graphics.TextureManager.add("DragonRed",			"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_Red.png");
	// tm.graphics.TextureManager.add("DragonBlack",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_Black.png");
	// tm.graphics.TextureManager.add("DragonWhite",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_White.png");
	// tm.graphics.TextureManager.add("DragonGhost",		"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Dragon_Ghost.png");

	// tm.graphics.TextureManager.add("Death",				"http://rawgithub.com/omatoro/Rogue/master/rsc/[Monster]Death_Uroboros.png");


	// エフェクト
	tm.graphics.TextureManager.add("slash", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/boldslash.png");

	// マップ
	tm.graphics.TextureManager.add("Dirt1_pipo", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/[A]Dirt1_pipo.png");
	tm.graphics.TextureManager.add("Grass1_pipo", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/[A]Grass1_pipo.png");
	tm.graphics.TextureManager.add("Water2_pipo", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/[A]Water2_pipo.png");
	tm.graphics.TextureManager.add("stairs", 		"http://rawgithub.com/omatoro/Rogue/master/rsc/stairs.png");

	// アイテム
	tm.graphics.TextureManager.add("dropWeapon",   	"http://rawgithub.com/omatoro/Rogue/master/rsc/drop_weapon.png");
	tm.graphics.TextureManager.add("dropTreasure", 	"http://rawgithub.com/omatoro/Rogue/master/rsc/item.png");

	// 音
	tm.sound.SoundManager.add("levelup",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Action]Chinese_blade1_Komori.mp3");
	tm.sound.SoundManager.add("openTreasure",	"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Action]Door01_Isooki.mp3");
	tm.sound.SoundManager.add("downStairs",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Action]Steps1_Isooki.mp3");
	tm.sound.SoundManager.add("playerdamage",	"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Effect]Attack6_panop.mp3");
	tm.sound.SoundManager.add("enemydamage",	"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Effect]SHUN_panop.mp3");
	tm.sound.SoundManager.add("healing",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Effect]Healing2_panop.mp3");
	tm.sound.SoundManager.add("enemydown",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Effect]SHUWAAAN3_panop.mp3");
	tm.sound.SoundManager.add("playerdown",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Effect]ZAZAZAZA_panop.mp3");
	tm.sound.SoundManager.add("enter",			"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[System]Enter02_Koya.mp3");
	tm.sound.SoundManager.add("openstatus",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[System]Click_Komori.mp3");
	tm.sound.SoundManager.add("equip",			"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Action]Switch2_Komori.mp3");
	tm.sound.SoundManager.add("eat",			"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/[Action]Eating_soup_Komori.mp3");
	tm.sound.SoundManager.add("gameclear",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/Fanfare01_Koya.mp3");
	tm.sound.SoundManager.add("dungeon",		"http://rawgithub.com/omatoro/Rogue/master/rsc/sound/Dungeon02_Koya.mp3", 1);

});
