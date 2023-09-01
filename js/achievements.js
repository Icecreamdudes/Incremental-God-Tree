addLayer("a", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/trophy.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        achievementpower: new Decimal(0),
        achievementpoints: new Decimal(0),
        achievementpointseffect: new Decimal(0),
        achievementpointspersecond: new Decimal(0),
    }
    },
    nodeStyle: {
        background: "linear-gradient(45deg, blue, purple)",
        "background-origin": "border-box",
    },
    color: "blue",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip: "Achievements", // Row the layer is in on the tree (0 is the first row)
    update(delta) {
        //achievement points
        if (hasUpgrade("h", 26)) player.a.achievementpointspersecond = player.a.achievementpower.pow(1.5)
        player.a.achievementpointspersecond = player.a.achievementpointspersecond.mul(buyableEffect("a", 11))

        player.a.achievementpoints = player.a.achievementpoints.add(player.a.achievementpointspersecond.mul(delta))
        player.a.achievementpointseffect = player.a.achievementpoints.pow(0.6).add(1)
    },
    clickables: {

    },
    upgrades: {
        11:
        {
            title: "Artifact (a)",
            unlocked() { return hasUpgrade("i", 155) },
            cost: new Decimal("1e6"),
            currencyLocation() { return player.a },
            currencyDisplayName: "Achievement Points",
            currencyInternalName: "achievementpoints",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.a.achievementpoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Achievement Point Booster"
            },
            display() {
                return "which gives a x" + format(tmp[this.layer].buyables[this.id].effect) + " boost to achievement points per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Achievement Points"
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.a.achievementpoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.a.achievementpoints = player.a.achievementpoints.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
    },
    achievements: {
        11: {
            name: "Very first tree",
            done() { return player.i.trees.gte("1") },
            tooltip: "Get 1 Tree.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        12: {
            name: "1 Point for each realm",
            done() { return player.points.gte("6") },
            tooltip: "Get 6 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        13: {
            name: "86400 Points a day",
            done() { return player.gain.gte("1") },
            tooltip: "Get 1 point per second.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        14: {
            name: "Softcap beginner",
            done() { return player.i.treesoftcapstart.gte("20") },
            tooltip: "Extend tree softcap to 20.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        15: {
            name: "Pi Eater",
            done() { return player.points.gte("314") },
            tooltip: "Reach 314 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        16: {
            name: "60 Trees a minute",
            done() { return player.i.trees.gte("60") },
            tooltip: "Get 60 trees.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        17: {
            name: "1e7 Points a day",
            done() { return player.gain.gte("115.74") },
            tooltip: "Get 115.74 points per second.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        18: {
            name: "Photosynthesis Lover",
            done() { return player.i.leaves.gte("150") },
            tooltip: "Get 150 leaves", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        19: {
            name: "Welcome to the Crypto Club",
            done() { return player.i.crypto.gte("1") },
            tooltip: "Get 1 crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        21: {
            name: "Booster Bandit",
            done() { return (hasUpgrade("i", 18) && hasUpgrade("i", 19) && hasUpgrade("i", 21) && hasUpgrade("i", 22)) },
            tooltip: "Buy the first 4 crypto upgrades.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        22: {
            name: "Not a Hevipelle Reference",
            done() { return (hasUpgrade("i", 27)) },
            tooltip: "Unlock crypto dimensions.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        23: {
            name: "Kilobyte",
            done() { return player.i.bytes.gte(1024) },
            tooltip: "Get 1024 bytes.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        24: {
            name: "Pi Muncher",
            done() { return player.points.gte(3141592) },
            tooltip: "Get 3.14e6 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        25: {
            name: "Multiplyer Man",
            done() { return player.i.buyables[11].gte(250) },
            tooltip: "Get 250 leaf multipliers.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        26: {
            name: "Just Like Elon",
            done() { return player.i.crypto.gte(1e12) },
            tooltip: "Get 1e12 crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        27: {
            name: "You are a Modder Now",
            done() { return player.i.codeexperience.gte(1) },
            tooltip: "Get 1 code experience.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        28: {
            name: "More Mods Than Ducdat",
            done() { return player.i.mods.gte(4) },
            tooltip: "Make 4 mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        29: {
            name: "Almost as Cool as Zuckerberg",
            done() { return player.i.crypto.gte(1e25) },
            tooltip: "Get 1e25 crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        31: {
            name: "Dimensional Multi Millionaire",
            done() { return player.i.cryptodim1.gte(1e7) },
            tooltip: "Get 1e7 1st crypto dimensions.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        32: {
            name: "Man of Many Realms",
            done() { return player.i.creatormods.gte(50) && player.i.highmods.gte(50) && player.i.deathmods.gte(50) && player.i.dimensionalmods.gte(50) && player.i.backroomsmods.gte(50) && player.i.voidmods.gte(50) },
            tooltip: "Get 50 mods for each realm.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        33: {
            name: "Softcap Trainee",
            done() { return player.i.modsoftcapstart.gte(50) },
            tooltip: "Extend mod softcap to 50.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        34: {
            name: "Cooler than Zuckerberg",
            done() { return player.i.crypto.gte(1e75) },
            tooltip: "Get 1e75 crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        35: {
            name: "Reached ee2 Points!",
            done() { return player.points.gte(1e100) },
            tooltip: "Get 1e100 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        36: {
            name: "Not Even Close to Despacit",
            done() { return player.i.mods.gte(10000000) },
            tooltip: "Get 1e7 mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        37: {
            name: "Jacorb Running Through Your Veins!",
            done() { return player.i.jacorbianenergy.gte(1) },
            tooltip: "Get 1 jacorbian energy.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        38: {
            name: "Antimatter Dimensions Reference",
            done() { return player.i.infinitypoints.gte(1) },
            tooltip: "Get 1 infinity point.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1.5) },
        },
        39: {
            name: "1 1/2 Infinities!",
            done() { return player.i.infinities.gte(1) && player.points.gte(1.33e154) },
            tooltip: "Get 1.33e154 points and 1 infinity.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        41: {
            name: "Another One",
            done() { return player.i.infinities.gte(2) },
            tooltip: "Get 2 infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        42: {
            name: "Infinitely More Realms",
            done() { return player.i.infinitypoints.gte(6) },
            tooltip: "Get 6 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        43: {
            name: "Antimatter Dimensions PTSD",
            done() { return hasChallenge("i", 12) },
            tooltip: "Beat the easy challenge.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        44: {
            name: "No Buyables?",
            done() { return hasChallenge("i", 15) },
            tooltip: "Beat the advanced challenge.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        45: {
            name: "Easiest AD Challenge, but Harder?",
            done() { return hasChallenge("i", 16) },
            tooltip: "Beat the hard challenge.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        46: {
            name: "The Big Hundred",
            done() { return player.i.infinities.gte(100) },
            tooltip: "Get 100 infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        47: {
            name: "Ayo the Naming?",
            done() { return hasUpgrade("i", 66) },
            tooltip: "Unlock the hub.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        48: {
            name: "Very powerful indeed.",
            done() { return player.h.willpower.gte(1000) },
            tooltip: "Get 1000 willpower.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        49: {
            name: "Shrineful",
            done() { return player.h.shrinepower.gte(4) },
            tooltip: "Get 4 shrine power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        51: {
            name: "WHERE'S MY 1E800 POINTS?",
            done() { return player.i.brokeninfinities.gte(100) },
            tooltip: "Get 100 broken infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        52: {
            name: "Infinitillionaire",
            done() { return player.i.infinitypoints.gte(1e7) },
            tooltip: "Get 1e7 infinitiy points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        53: {
            name: "Shrinetatious",
            done() { return player.h.shrinepower.gte(12) },
            tooltip: "Get 12 shrine power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        54: {
            name: "I'M BROKEN :(",
            done() { return player.i.infinitybroken.eq(1) },
            tooltip: "Break Infinity.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        55: {
            name: "Yay! I got my 1e800 Points!",
            done() { return player.points.gte("1e800") },
            tooltip: "Get 1e800 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        56: {
            name: "Degree In Computer Science",
            done() { return player.i.codeexperience.gte("1e100") },
            tooltip: "Get 1e100 code experience.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        57: {
            name: "Pi Devourer",
            done() { return player.i.infinitypoints.gte("3e14") },
            tooltip: "Get 3e14 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        58: {
            name: "Where's My Inflation?",
            done() { return player.i.replicanti.gte("25") },
            tooltip: "Get 25 replicanti.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        59: {
            name: "INFINITE REPLICANTI?",
            done() { return player.i.replicanti.gte("1.79e308") },
            tooltip: "Get 1e308 replicanti.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        61: {
            name: "The Year This Mod Was Made?",
            done() { return player.points.gte("1e2023") },
            tooltip: "Get 1e2023 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        62: {
            name: "I'M EVEN MORE BROKEN",
            done() { return player.i.brokeninfinities.gte("1e9") },
            tooltip: "Get 1e9 broken infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        63: {
            name: "Infinity Dimensions After Replicanti?",
            done() { return player.i.infinitypower.gte("1000") },
            tooltip: "Get 1000 infinity power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        64: {
            name: "A Lot Of Replicanti Died For This.",
            done() { return player.i.replicantimods.gte("20") },
            tooltip: "Get 20 replicanti mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        65: {
            name: "Willionaire",
            done() { return player.h.willpower.gte("1e6") },
            tooltip: "Get 1e6 willpower.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        66: {
            name: "The Meta-Achievement",
            done() { return player.a.achievementpower.gte("38") },
            tooltip: "Get 38 achievement power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        67: {
            name: "Pi Fangirl",
            done() { return player.i.infinitypower.gte("3e14") },
            tooltip: "Get 3e14 infinity power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        68: {
            name: "A Whole Lotta Points",
            done() { return player.points.gte("1e10000") },
            tooltip: "Get 1e10000 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        69: {
            name: "Demonic Infinity",
            done() { return player.i.infinitypoints.gte("6e66") },
            tooltip: "Get 6e66 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        71: {
            name: "Holdup another layer?",
            done() { return player.h.prestigepower.gte("1") },
            tooltip: "Get 1 prestige power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        72: {
            name: "Demonic Infinity Power",
            done() { return player.i.infinitypower.gte("6e66") },
            tooltip: "Get 6e66 infinity power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        73: {
            name: "HOW DOES THIS FEATURE WORK??",
            done() { return player.h.redenergy.gte(500) && player.h.greenenergy.gte(500) && player.h.blueenergy.gte(500) },
            tooltip: "Get 500 of each energy type.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        74: {
            name: "Pi Extremist",
            done() { return player.points.gte("1e31415") },
            tooltip: "Get 1e31415 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        75: {
            name: "Shrinetastic",
            done() { return player.h.shrinepower.gte("500") },
            tooltip: "Get 500 shrine power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        76: {
            name: "Still Single???",
            done() { return player.i.singularities.gte("1") },
            tooltip: "Do a singularity reset.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        77: {
            name: "Inflated Singularity",
            done() { return player.i.singularitypower.gte("1e12") },
            tooltip: "Get 1e12 singularity power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        78: {
            name: "Where is my precious eternity?",
            done() { return player.i.infinitypoints.gte("1.79e308") },
            tooltip: "Get 1.79e308 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        79: {
            name: "Singularitree",
            done() { return player.i.singularitytrees.gte("15") },
            tooltip: "Get 15 singularity trees.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        81: {
            name: "Blessed Up",
            done() { return player.i.singularityblessings.gte("100") },
            tooltip: "Get 100 singularity blessings", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        82: {
            name: "Seriously, where is eternity?",
            done() { return player.i.infinitypoints.gte("1.79e3008") },
            tooltip: "Get 1.79e3008 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        83: {
            name: "ee6",
            done() { return player.points.gte("1e1000000") },
            tooltip: "Get 1e1000000 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        84: {
            name: "Theory Master",
            done() { return player.i.singularitytheorems.gte("50") },
            tooltip: "Get 50 singularity theorems.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        85: {
            name: "A Heaping Teaspoon of Replicanti Died for this.",
            done() { return player.i.replicantimods.gte("1e150") },
            tooltip: "Get 1e150 replicanti mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        86: {
            name: "True Virginity.",
            done() { return player.i.singularitypoints.gte("1e300") },
            tooltip: "Get 1e300 singularity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        87: {
            name: "How Are We Back In This Section?",
            done() { return player.i.jacorbmods.gte("1e6") },
            tooltip: "Get 1e6 jacorbian mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        88: {
            name: "Oh God Not Another Challenge.",
            done() { return inChallenge("i", 24) },
            tooltip: "Absorb the power of the void.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        89: {
            name: "DILATION FROM ANTIMATTER DIMENSIONS????",
            done() { return player.i.voidsingularities.gte("1") },
            tooltip: "Get 1 void singularity.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        91: {
            name: "Pi on Drugs",
            done() { return player.i.singularitypower.gte("1e314") },
            tooltip: "Get 1e314 singularity power", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        92: {
            name: "MY BELOVED ETERNITY, WHERE IS IT????",
            done() { return player.i.infinitypoints.gte("1.79e30008") },
            tooltip: "Get 1.79e30008 infinity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        93: {
            name: "Still Single Even In The Void?",
            done() { return player.i.voidsingularities.gte("4000") },
            tooltip: "Get 4000 void singularities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        94: {
            name: "Even In The Void Eternity Is Gone.",
            done() { return player.i.infinitypoints.gte("1.79e308") && inChallenge("i", 24) },
            tooltip: "Get 1.79e308 infinity points while absorbing void.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        95: {
            name: "Why Can't I Have Reality As Well?",
            done() { return player.i.singularitypoints.gte("1e4000") },
            tooltip: "Get 1e4000 singularity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        96: {
            name: "THE INFLATION IS COMING.",
            done() { return player.i.singularitypoints.gte("e1e15") },
            tooltip: "Get e1e15 singularity points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        97: {
            name: "Don't Forget...",
            done() { return player.i.jacorbianenergy.gte("1e456") },
            tooltip: "Get 1e456 jacorbian energy.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        98: {
            name: "Omega Layers Reference?",
            done() { return player.i.omegapoints.gte("6") },
            tooltip: "Get 6 ω.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(2) },
        },
        99: {
            name: "Pi Body Pillow Owner",
            done() { return player.points.gte("ee3141") },
            tooltip: "Get e1e3141 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        101: {
            name: "Beta Male Moment",
            done() { return player.i.beta.gte("1000") },
            tooltip: "Get 1000 β.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        102: {
            name: "Enough Antimatter Dimensions References!",
            done() { return player.i.sacrificemult.gte("11") },
            tooltip: "Get a x11 β dimensions sacrifice multiplier.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        103: {
            name: "There Will Always Be More Challenges",
            done() { return hasChallenge("i", 25) },
            tooltip: "Beat δ Challenge I.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        104: {
            name: "Aarex Running Through Your Veins",
            done() { return player.h.aarexianenergy.gte(1000) },
            tooltip: "Gain 1000 aarexian energy.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        105: {
            name: "Epsilionaire",
            done() { return player.i.epsilon.gte(1000000) },
            tooltip: "Gain 1000000 ε.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        106: {
            name: "Triple E's",
            done() { return player.points.gte("eee9") },
            tooltip: "Gain eee9 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        107: {
            name: "Don't you already have more than a few thousand of these?",
            done() { return player.i.truesingularitylevel.gte("10") },
            tooltip: "Get TS level 10.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        108: {
            name: "Pi Tier 3 Sub",
            done() { return player.i.aarexpoints.gte("3.14e10") },
            tooltip: "Get 3.14e10 aarex points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        109: {
            name: "Quest Lord",
            done() { return player.i.singularityenergy.gte("65") },
            tooltip: "Get 65 singularity energy.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        111: {
            name: "Cante Touch This",
            done() { return player.i.cantecantimods.gte("2") },
            tooltip: "Get 2 cantecanti mods.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        112: {
            name: "Cante-Rich",
            done() { return player.i.cantecanti.gte("1e35") },
            tooltip: "Get 1e35 cantecanti.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        113: {
            name: "Return of the Sacred Path",
            done() { return player.i.timeshards.gte("100") },
            tooltip: "Get 100 time shards.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        114: {
            name: "Singularity Inflation",
            done() { return player.i.truesingularitylevel.gte("500") },
            tooltip: "Reach TS level 500.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        //FUN ACHIEVEMENTS
        1001: {
            name: "Zuck Would Be Proud",
            done() { return player.points.eq(1) && player.i.crypto.gte(0.2) && player.a.achievementpower.gte(18) },
            tooltip: "Get 0.2 crypto with exactly ONE point.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1002: {
            name: "#TeamNoTrees",
            done() { return player.points.gte(1e6) && player.i.trees.lt(1000) && player.a.achievementpower.gte(18) },
            tooltip: "Get 1e6 points with less than 1000 trees.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1003: {
            name: "Barebones Modder",
            done() { return player.points.eq(1) && player.i.mods.gte(1) && player.a.achievementpower.gte(18) },
            tooltip: "Make a mod with exactly ONE point.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1004: {
            name: "Brave Modder",
            done() { return player.i.codeexperience.gte(250) && player.i.buyables[11].eq(0) && player.i.buyables[12].eq(0) && player.i.buyables[13].eq(0) && player.i.buyables[14].eq(0) && player.a.achievementpower.gte(18)  },
            tooltip: "Get 250 code experience without buying tree buyables", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1005: {
            name: "Slow Paced Player",
            done() { return player.i.infinitytime.gte(86400) && player.i.infinities.gte(20) && player.a.achievementpower.gte(18) },
            tooltip: "Be in an infinity for a day and have more than 20 infinities", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1.5) },
        },
        1006: {
            name: "Sigma Male Challenge",
            done() { return player.i.apoints.gte(1e300) && player.a.achievementpower.gte(18) },
            tooltip: "Get more than 1e300 antipoints.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1007: {
            name: "Jacorb Would Be Proud",
            done() { return player.i.totalrealmmods.gte(1e9) && player.points.lt(1e100) && player.a.achievementpower.gte(18) },
            tooltip: "Get 1e9 total realm mods whilst having less than 1e100 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1008: {
            name: "All the Infinities but no Infinities",
            done() { return player.i.infinitypoints.gte(1e7) && player.i.infinities.lt(0.1) && player.a.achievementpower.gte(18) },
            tooltip: "Get 1e7 IP but with no infinities (you know how to get this).", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1009: {
            name: "Inf in it ie",
            done() { return player.i.infinities.gte(player.i.brokeninfinities) && player.i.brokeninfinities.gt(10000) && player.a.achievementpower.gte(18) },
            tooltip: "Have more infinities than broken infinities whilst having more than 10000 broken infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1.5) },
        },
        1011: {
            name: "Oddly specific arrangement of numbers",
            done() { return player.points.gt("1e1082") && player.points.lt("1e1083") && player.a.achievementpower.gte(18) && player.i.bytes.gt("1e111") && player.i.bytes.lt("1e112") && player.i.mods.gt("1e34") && player.i.mods.lt("1e35") && player.i.ipautobuyamount.eq("2e13") },
            tooltip: "Have in between 1e1082-1e1083 points, 1e111-1e112 bytes, 1e34-1e35 mods, and have your autocrunch amount set to 2e13 IP.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1012: {
            name: "All the Points but no Power",
            done() { return player.points.gte("1e3000") && player.i.infinitypower.lt(3000) && player.a.achievementpower.gte(18) },
            tooltip: "Have 1e3000 points with less than 3000 infinity power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1013: {
            name: "The cleanse",
            done() { return player.h.slotstatus[1].eq(5) && player.a.achievementpower.gte(18) && player.h.slotstatus[2].eq(5) && player.h.slotstatus[3].eq(5) && player.h.slotstatus[4].eq(5) && player.h.slotstatus[5].eq(5) && player.h.slotstatus[6].eq(5) && player.h.slotstatus[7].eq(5) },
            tooltip: "Make the assembly line a cleanse (follow the guide).", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1014: {
            name: "Truly Demonic",
            done() { return player.i.trees.gte("1e666") && inChallenge("i", 18) && player.a.achievementpower.gte(18) },
            tooltip: "Have 1e666 trees in the demonic challenge.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1015: {
            name: "Even Easier",
            done() { return player.points.gte("1e33333") && inChallenge("i", 11) && player.a.achievementpower.gte(18) },
            tooltip: "Have 1e33333 points in the easiest challenge.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1016: {
            name: "The Power to Live",
            done() { return player.h.willpower.gte("1e10") && player.h.shrinepower.eq(0) && player.a.achievementpower.gte(18) },
            tooltip: "Have 1e10 willpower without any shrine power.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1017: {
            name: "MY FAVORITE FEATURE IS BACK!",
            done() { return player.i.jacorbianenergy.gte("0") && player.i.singularities.gt(0) && player.a.achievementpower.gte(18) },
            tooltip: "Gain jacorbian energy post-singularity.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1018: {
            name: "My Favorite Feature Will Never Leave Me!",
            done() { return player.i.jacorbianenergy.gte("10000") && player.a.achievementpower.gte(18) },
            tooltip: "Gain 10000 jacorbian energy.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1019: {
            name: "My Favorite Feature Will Never Even Leave Me In Pain!",
            done() { return player.i.jacorbianenergy.gte("10000") && inChallenge("i", 24) && player.a.achievementpower.gte(18) },
            tooltip: "Gain 10000 jacorbian energy while absorbing void.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1021: {
            name: "But Why?",
            done() { return player.h.slotredenergy[7].gte(100000) && player.a.achievementpower.gte(18) },
            tooltip: "Get 100000 red energy on slot 7.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1022: {
            name: "True Jacorbian Hell",
            done() { return inChallenge("i", 23) && player.points.gte("1e6666") && player.a.achievementpower.gte(18) },
            tooltip: "Get 1e6666 points in Trial IV.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        1023: {
            name: "Screaming in Greek",
            done() { return player.i.omegas.gt(player.i.omegapoints) && player.a.achievementpower.gte(18) },
            tooltip: "Get more Ω than ω.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1024: {
            name: "A Lot of Jacorb in Your Veins",
            done() { return player.i.jacorbianenergy.gt("ee9") && player.points.lt("eee9") && player.a.achievementpower.gte(18) },
            tooltip: "Get more than ee9 jacorbian energy whilst having less than eee9 points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1025: {
            name: "Double Down",
            done() { return player.i.cantecanti.lt("0.1") && player.a.achievementpower.gte(18) },
            tooltip: "Have less than 0.1 cantecanti.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        1026: {
            name: "Intricate Game Design",
            done() { return player.i.jacorbquest.gt("50") && player.i.aarexquest.lt("20") && player.a.achievementpower.gte(18) },
            tooltip: "Do 50 jacorb quests but less than 20 aarex quests.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        //COMMUNITY
        2001: {
            name: "Once a man, Jacorb was no fool.",
            done() { return player.i.jacorbianunlock.eq(1) },
            tooltip: "Implement jacorbian balancing.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(2.5) },
        },
        2002: {
            name: "Now a god, the creator of games he rule.",
            done() { return player.i.jacorbianenergy.gte(1000000) && player.i.jacorbianunlock.eq(1) },
            tooltip: "Get 1000000 jacorbian energy while balancing.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2003: {
            name: "He shed the light upon the trees,",
            done() { return player.i.jacorbiantrialunlock.eq(1) },
            tooltip: "Unlock the trials of jacorb.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2004: {
            name: "He made Aarex fall on his knees.",
            done() { return player.i.jacorbianunlock.eq(1) && player.points.gte("1e666666") },
            tooltip: "Get 1e666666 points while balancing.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2005: {
            name: "Jacorb is a noble, he is the automation one.",
            done() { return hasChallenge("i", 19) },
            tooltip: "Beat Trial I.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2006: {
            name: "When he got captured by the death, he was done.",
            done() { return hasChallenge("i", 21) },
            tooltip: "Beat Trial II.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2007: {
            name: "In exile, Jacorb may have become insane.",
            done() { return hasChallenge("i", 22) },
            tooltip: "Beat Trial III.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2008: {
            name: "Softcaps and inflation? I don't think it's the same.",
            done() { return hasChallenge("i", 23) },
            tooltip: "Beat Trial IV.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2009: {
            name: "Aarex, the omnisity of NG+3.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            tooltip: "Get all aarexian artifacts.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(2.5) },
        },
        2011: {
            name: "Him and jacorb, they made the prestige tree.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.aarexpoints.gte(10000) },
            tooltip: "Get 10000 aarex points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2012: {
            name: "Both in exile, you must set them free.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.wastedaarexpoints.gte(1000) },
            tooltip: "Get 1000 wasted aarex points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2013: {
            name: "If not, you will fail.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.aarexpoints.gte(100000) },
            tooltip: "Get 100000 aarex points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2014: {
            name: "Aarex will give gifts, like the quantum trail.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.wastedaarexpoints.gte(100000) },
            tooltip: "Get 100000 wasted aarex points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2015: {
            name: "Grinding aarex points, to pay off his bail.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.aarexifiedinfinities.gte(1000) },
            tooltip: "Get 1000 aarexified infinities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
        2016: {
            name: "When you set him free, he will tell you his tale.",
            unlocked() { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) },
            done() { return player.i.aarexifiedsingularities.gte(1000) },
            tooltip: "Get 1000 aarexified singularities.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(0.5) },
        },
    },
    bars: {
    },
    microtabs: {
        stuff: {
            "Achievements": {
                buttonStyle() { return { 'color': 'violet' } },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpower) + " achievement power.</h2>" }],
                    ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18], ["achievement", 19], ["achievement", 21], ["achievement", 22], ["achievement", 23]]],
                    ["row", [["achievement", 24], ["achievement", 25], ["achievement", 26], ["achievement", 27], ["achievement", 28], ["achievement", 29], ["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34], ["achievement", 35], ["achievement", 36]]],
                    ["row", [["achievement", 37], ["achievement", 38], ["achievement", 39], ["achievement", 41], ["achievement", 42], ["achievement", 43], ["achievement", 44], ["achievement", 45], ["achievement", 46], ["achievement", 47], ["achievement", 48], ["achievement", 49]]],
                    ["row", [["achievement", 51], ["achievement", 52], ["achievement", 53], ["achievement", 54], ["achievement", 55], ["achievement", 56], ["achievement", 57], ["achievement", 58], ["achievement", 59], ["achievement", 61], ["achievement", 62], ["achievement", 63]]],
                    ["row", [["achievement", 64], ["achievement", 65], ["achievement", 66], ["achievement", 67], ["achievement", 68], ["achievement", 69], ["achievement", 71], ["achievement", 72], ["achievement", 73], ["achievement", 74], ["achievement", 75], ["achievement", 76]]],
                    ["row", [["achievement", 77], ["achievement", 78], ["achievement", 79], ["achievement", 81], ["achievement", 82], ["achievement", 83], ["achievement", 84], ["achievement", 85], ["achievement", 86], ["achievement", 87], ["achievement", 88], ["achievement", 89]]],
                    ["row", [["achievement", 91], ["achievement", 92], ["achievement", 93], ["achievement", 94], ["achievement", 95], ["achievement", 96], ["achievement", 97], ["achievement", 98], ["achievement", 99], ["achievement", 101], ["achievement", 102], ["achievement", 103]]],
                    ["row", [["achievement", 104], ["achievement", 105], ["achievement", 106], ["achievement", 107], ["achievement", 108], ["achievement", 109], ["achievement", 111], ["achievement", 112], ["achievement", 113], ["achievement", 114]]],
                    ["raw-html", function () { return "<h3>Note: Some achievements are worth more than others</h3>" }],
                ]

            },
            "Fun Achievements": {
                unlocked() { return player.a.achievementpower.gte(18) },
                buttonStyle() { return { 'color': 'violet' } },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpower) + " achievement power.</h2>" }],
                    ["row", [["achievement", 1001], ["achievement", 1002], ["achievement", 1003], ["achievement", 1004], ["achievement", 1005], ["achievement", 1006], ["achievement", 1007], ["achievement", 1008], ["achievement", 1009], ["achievement", 1011], ["achievement", 1012]]],
                    ["row", [["achievement", 1013], ["achievement", 1014], ["achievement", 1015], ["achievement", 1016], ["achievement", 1017], ["achievement", 1018], ["achievement", 1019], ["achievement", 1021], ["achievement", 1022], ["achievement", 1023], ["achievement", 1024]]],
                    ["row", [["achievement", 1013], ["achievement", 1025], ["achievement", 1026]]],
                    ["raw-html", function () { return "<h3>Note: Some of these achievements will be unobtainable, but reobtainable on upcoming layer resets.</h3>" }],
                ]

            },
            "Community Achievements": {
                unlocked() { return hasAchievement("a", 2001) },
                buttonStyle() { return { 'color': 'violet' } },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpower) + " achievement power.</h2>" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>Jacorb</h2>" }],
                    ["row", [["achievement", 2001], ["achievement", 2002], ["achievement", 2003], ["achievement", 2004], ["achievement", 2005], ["achievement", 2006], ["achievement", 2007], ["achievement", 2008]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return hasUpgrade("i", 155) && hasUpgrade("i", 156) && hasUpgrade("i", 157) && hasUpgrade("a", 11) && hasUpgrade("h", 32) ? "<h2>Aarex</h2>" : "" }],
                    ["row", [["achievement", 2009], ["achievement", 2011], ["achievement", 2012], ["achievement", 2013], ["achievement", 2014], ["achievement", 2015], ["achievement", 2016]]],
                ]

            },
            "Achievement Points": {
                unlocked() { return hasUpgrade("h", 26) },
                buttonStyle() { return { 'color': 'violet' } },
                content: [
                    ["microtabs", "points", { 'border-width': '0px' }],
                ]

            },
        },
        points:
        {
            "Main": {
                unlocked() { return true },
                buttonStyle() { return { 'color': 'violet' } },
                content:
                    [
                    ["blank", "25px"],
                        ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpower) + " achievement power.</h2>" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpoints) + " achievement points, which give a x" + format(player.a.achievementpointseffect) + " boost to willpower.</h2>" }],
                        ["raw-html", function () { return "<h2>You are gaining " + format(player.a.achievementpointspersecond) + " achievement points per second.</h2>" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 11]]],
                        ["blank", "25px"],
                        ["row", [["upgrade", 11]]],
                    ]

            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        ["raw-html", function () { return options.musicToggle ? "<audio controls autoplay loop hidden><source src=music/achievements.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>" : ""}],
    ],
    layerShown() {
        return true
    }
})
