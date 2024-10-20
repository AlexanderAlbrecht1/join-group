/**
 * Design the Submit button 
 * and give it the possiblility of Press or not (enable/disable)
 * 
 * @param {bool} submit - input is changed to false or tru (elemnt form interface)
 */
function disableCheck(submit, id = "submit") {
    let button = document.getElementById(id)
    if (button == null) return
    if (submit) {
        enableButton(button);
    } else
        if (!button.disabled) {
            disableButton(button);
        }
}


/**
 * 
 * PUBLIC 
 * 
 * Disables the Button
 * 
 * @param {element} button - elementof the button to disable/enable
 */
function disableButton(button) {
    button.disabled = true;
    button.classList.add("disable");
    button.style.cursor = "not-allowed";
    button.style.backgroundColor = "#A0A0A0";
}


/**
 * 
 * PUBLIC 
 * 
 * Enable the Button
 * 
 * @param {element} button - elementof the button to disable/enable
 */
function enableButton(button) {
    button.disabled = false;
    button.classList.remove("disable");
    button.style.color = "";
    button.style.filter = "";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "";
}


/**
 * Check fields if they could be sent, 
 * so all flields ust be valid
 * 
 * @param {array} list - List of ids of the interface 
 * @returns - true if all fields are valid and ready to work width
 */
function inputFilled(list) {
    for (let item of list) {
        let d = document.getElementById(item);
        if (d.type == "checkbox" && d.checked == false) {
            return false;
        }
        if (!d.validity.valid) {
            return false;
        }
    }

    return true;
}


/**
 * 1. check if all fields are valid
 * 2. if valid Submit Button is enabled otherwise disabled an greyed out
 * 
 * @param {array} list - List of ids in the interface 
 */
function sendButton(event, list) {
    let submit = inputFilled(list);
    disableCheck(submit);
    addValidationMessage(event.target);
}


/**
 * 
 * Pust out message that the field iis invalid
 * 
 * @param {element} element - from inputfield the message
 */
function addValidationMessage(element) {
    let msg = document.getElementById(element.id + "-msg");
    if (msg) {
        if (!element.checkValidity()) {
            msg.innerHTML = element.validationMessage;
        } else {
            msg.innerHTML = "";
        }
    }
}


/**
 * 
 * PUBLIC
 * 
 * Disable some FormEvents
 * 
 * @param {text} formid - the name ginven th the FORM Tag
 */
function disableFormEvents(formid) {
    let form = document.getElementById(formid);
    inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(element => {
        element.addEventListener("invalid", e => e.preventDefault());
        element.addEventListener("submit", e => e.preventDefault());
    });
}


/**
* 
* PUBLIC
* 
* Add some Listeners for the input
* 
* @param {element} formSelector - The FORM we want to analyse
* @param {object} styleObject   - givin style for the Errors
*/
function addFormListener(formSelector, styleObject) {
    let form = document.querySelector(formSelector);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        styleElement(input, styleObject);
        input.addEventListener('input', eventErrorMsg);
        input.addEventListener("focusin", e => removeCustomErrorCode(input)); // to be able te re Submit ohne ALL
        input.addEventListener("blur", e => removeCustomMsg(input)); // to be able te re Submit ohne ALL
    });
}


/**
 * 
 * PRIVATE
 * 
 * Checks if teher other otions to check, that cannot be in Rquired
 * 
 * @param {element} element input element
 */
function extraValidationCheck(element) {
    let cl = element.parentElement.classList;
    if (cl.contains("email") && !isTLDAvailable(element.value)) {
        element.setCustomValidity(`Please enter an existing Top Level Domain`);
    } else {
        element.setCustomValidity(``);
    }
}

/**
 * 
 * exchanges the standart Errormessages for pattern check
 * later add more and use an array 
 * 
 * @param {event} e - Element of the inputfield that has trieggerded
 *  
 * @returns - nothing
 */
function customMessage(element) {
    let cl = element.parentElement.classList;
    if (!element.validity.patternMismatch) {
        extraValidationCheck(element);
        return;
    }
    if (cl.contains("new")) {
        element.setCustomValidity(`Minimum: 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 special char`);
    } else if (cl.contains("name")) {
        element.setCustomValidity(`no special chars, names has to begin width letters`);
    } else if (cl.contains("email")) {
        element.setCustomValidity(`please use a format like user@mail.com`);
    } else {
        element.setCustomValidity(``);
    }
}


/**
 * PUBLIC
 * 
 * Style an Elemet wid an Object
 * 
 * @param {element} node - Element that should be styleds
 * @param {*} styles - Object of Styles
 * @returns - nothing
 */
function styleElement(node, styles) {
    if (styles == null) return;
    for (let [key, value] of Object.entries(styles)) {
        node.style[key] = value;
    }
}


/**
 * 
 * PRIVATE 
 * 
 * Finds the element for the custom message and sets the Message+
 * 
 * @param {string} id 
 * @param {string} customMsg 
 * @returns - nothing
 */
function customErrorMsg(id = null, customMsg = null) {
    if (typeof (id) !== "string" || typeof (customMsg) !== "string") return;
    let sibling = document.getElementById(id);
    sibling.setCustomValidity(customMsg);
    setErrorMsg(sibling);
}


/**
 * 
 * Find the Form TAG of the inputfield we are in
 * private - called from:
 * -  eventErrorMsg
 * 
 * @param {elment} element - inputfield we use  
 * @returns - false if no FORM Tag is found, otherwise the tagName of the Forrm
 * 
 */
function getFormId(element) {
    let e = element;
    while ((e = e.parentElement) !== null) {
        if (e.tagName == "FORM") return e.id;
    }
    return false;
}


/**
 * 
 * PUBLIC
 * 
 * Finds the Form ID of Code starting by the given element
 * Returns the found element as ID QUERY TAG
 * 
 * @param {element} element 
 * @returns -id as Queryselöector
 */
function getFormQs(element) {
    return "#" + (getFormId(element) || "login-card");
}


/**
 * 
 * PUBLIC EVENT
 * 
 * Checks if the Form is allowed to send an error to each field
 * 
 * @param {event} event - input event 
 */
function eventErrorMsg(event) {
    let formquery = getFormQs(event.target);
    customMessage(event.target);
    setErrorMsg(event.target);
    let valid = isFormValid(formquery);
    disableCheck(valid);
    event.preventDefault();
}


/**
 * 
 * PRIVATE
 * 
 * Displays the error message
 * 
 * @param {element} element - set the Errormessage to the nearest SPAN TAG 
 * @returns element we search for
 */
function setErrorMsg(element) {
    sibling = element;
    while (sibling.nextElementSibling && sibling.nextElementSibling.tagName == 'SPAN') {
        sibling = sibling.nextElementSibling;
    }
    sibling.innerHTML = element.validity.valid ? "" : element.validationMessage;
    return sibling;
}


/**
 * 
 * shows the ser waht Password ist entered
 * 
 * @param {*} event - mouse event that triggered
 * @param {*} container  - No fnuction
 * @returns - nothing
 */
function togglePasswordView(event, container) {
    let passwordContainer = event.target.parentElement;
    let passwordInput = event.target.previousElementSibling;
    if (document.activeElement !== passwordInput) {
        return;
    }
    let isVisible = passwordContainer.classList.toggle("visible");
    passwordInput.type = isVisible ? "text" : "password";
    passwordInput.focus();

    event.preventDefault();
    event.stopPropagation();
}


/**
 * 
 * PUBLIC 
 * 
 * Clears error status 
 *  
 * @param {element} input - input element that has to clear the error 
 */
function removeCustomErrorCode(input) {
    input.setCustomValidity('');
}


/**
 * 
 * PRIVATE 
 * 
 * Clears the custom Error state
 * Triggert on Focus Lost
 * @param {element} input - error message element
 */
function removeCustomMsg(input) {
    input.setCustomValidity('');
    if (input.checkValidity()) {
        setErrorMsg(input);
    }
    let valid = isFormValid(getFormQs(input));
    disableCheck(valid);
}


/**
 * 
 * PUBLIC 
 * 
 * Clears all custom Error states in the form
 * @param {element} input - error message element
 */
function removeAllCustomMsg(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setCustomValidity('');
    })
}


/**
 * 
 * PUBLIC
 * 
 * Marks all Fields text or input 
 * 
 * @param {string} formid - id for the FORM tag 
 * @returns -nothing
 */
function markAllFieds(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        customMessage(input);
        setErrorMsg(input);
    })
}


/**
 * 
 * PUBLIC
 * 
 * Checks if all Fields in the form are valid
 * 
 * @param {string} formqs - gets the nearest TAG / ID / Class
 * 
 * @returns - elemet of the form
 */
function isFormValid(formqs) {
    let form = document.querySelector(formqs);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    let status = Array.from(inputs).findIndex(input => !input.checkValidity()) == -1;
    return status;
} 



function enableRedBorder(formqs) {
    let form = document.querySelector(formqs);
    if (!form) return;
    let inputs = form.querySelectorAll('input-container');    
    for (let input of inputs) {
        input.classList.add("invalid");
    }     
}


function disableRedBorder(formqs) {
    let form = document.querySelector(formqs);
    if (!form) return;
    let inputs = form.querySelectorAll('input-container');    
    for (let input of inputs) {
        input.classList.remove("invalid");
    }     
}



/**
 * 
 * private 
 * - called form handleErrors
 * 
 * Activates Errors while in input field and red border
 * @param {*} formid - the id of the form we want no to errors and border live 
 */
function activateFormErrors(formid) {
    let form=document.getElementById(formid);
    inputs = form.querySelectorAll('input');
    inputs.forEach(element => {
       element.parentElement.classList.add("invalid");
    });
    disableFormEvents(formid);
 }
 

 function validateForm(formid) {
    activateFormErrors(formid);
    markAllFieds("#"+formid);
 }


 /**
 * 
 * @param {element} element 
 * @returns 
 */
function isTLDAvailable(url) {
    let splitted_url=url.toLowerCase().split(".");
    if (splitted_url.length == 1) return false;
    searchTLD=`.${splitted_url[splitted_url.length-1]}.`;
    const tld=".aaa.aarp.abarth.abb.abbott.abbvie.abc.able.abogado.abudhabi.ac.academy.accenture.accountant.accountants.aco.active.actor.ad.adac.ads.adult.ae.aeg.aero.aetna.af.afamilycompany.afl.africa.ag.agakhan.agency.ai.aig.aigo.airbus.airforce.airtel.akdn.al.alfaromeo.alibaba.alipay.allfinanz.allstate.ally.alsace.alstom.am.amazon.americanexpress.americanfamily.amex.amfam.amica.amsterdam.an.analytics.android.anquan.anz.ao.aol.apartments.app.apple.aq.aquarelle.ar.arab.aramco.archi.army.arpa.art.arte.as.asda.asia.associates.at.athleta.attorney.au.auction.audi.audible.audio.auspost.author.auto.autos.avianca.aw.aws.ax.axa.az.azure.ba.baby.baidu.banamex.bananarepublic.band.bank.bar.barcelona.barclaycard.barclays.barefoot.bargains.baseball.basketball.bauhaus.bayern.bb.bbc.bbt.bbva.bcg.bcn.bd.be.beats.beauty.beer.bentley.berlin.best.bestbuy.bet.bf.bg.bh.bharti.bi.bible.bid.bike.bing.bingo.bio.biz.bj.bl.black.blackfriday.blanco.blockbuster.blog.bloomberg.blue.bm.bms.bmw.bn.bnl.bnpparibas.bo.boats.boehringer.bofa.bom.bond.boo.book.booking.boots.bosch.bostik.boston.bot.boutique.box.bq.br.bradesco.bridgestone.broadway.broker.brother.brussels.bs.bt.budapest.bugatti.build.builders.business.buy.buzz.bv.bw.by.bz.bzh.ca.cab.cafe.cal.call.calvinklein.cam.camera.camp.cancerresearch.canon.capetown.capital.capitalone.car.caravan.cards.care.career.careers.cars.cartier.casa.case.caseih.cash.casino.cat.catering.catholic.cba.cbn.cbre.cbs.cc.cd.ceb.center.ceo.cern.cf.cfa.cfd.cg.ch.chanel.channel.charity.chase.chat.cheap.chintai.chloe.christmas.chrome.chrysler.church.ci.cipriani.circle.cisco.citadel.citi.citic.city.cityeats.ck.cl.claims.cleaning.click.clinic.clinique.clothing.cloud.club.clubmed.cm.cn.co.coach.codes.coffee.college.cologne.com.comcast.commbank.community.company.compare.computer.comsec.condos.construction.consulting.contact.contractors.cooking.cookingchannel.cool.coop.corsica.country.coupon.coupons.courses.cpa.cr.credit.creditcard.creditunion.cricket.crown.crs.cruise.cruises.csc.cu.cuisinella.cv.cw.cx.cy.cymru.cyou.cz.dabur.dad.dance.data.date.dating.datsun.day.dclk.dds.de.deal.dealer.deals.degree.delivery.dell.deloitte.delta.democrat.dental.dentist.desi.design.dev.dhl.diamonds.diet.digital.direct.directory.discount.discover.dish.diy.dj.dk.dm.dnp.do.docs.doctor.dodge.dog.doha.domains.doosan.dot.download.drive.dtv.dubai.duck.dunlop.duns.dupont.durban.dvag.dvr.dz.earth.eat.ec.eco.edeka.edu.education.ee.eg.eh.email.emerck.energy.engineer.engineering.enterprises.epost.epson.equipment.er.ericsson.erni.es.esq.estate.esurance.et.etisalat.eu.eurovision.eus.events.everbank.exchange.expert.exposed.express.extraspace.fage.fail.fairwinds.faith.family.fan.fans.farm.farmers.fashion.fast.fedex.feedback.ferrari.ferrero.fi.fiat.fidelity.fido.film.final.finance.financial.fire.firestone.firmdale.fish.fishing.fit.fitness.fj.fk.flickr.flights.flir.florist.flowers.flsmidth.fly.fm.fo.foo.food.foodnetwork.football.ford.forex.forsale.forum.foundation.fox.fr.free.fresenius.frl.frogans.frontdoor.frontier.ftr.fujitsu.fujixerox.fun.fund.furniture.futbol.fyi.ga.gal.gallery.gallo.gallup.game.games.gap.garden.gay.gb.gbiz.gd.gdn.ge.gea.gent.genting.george.gf.gg.ggee.gh.gi.gift.gifts.gives.giving.gl.glade.glass.gle.global.globo.gm.gmail.gmbh.gmo.gmx.gn.godaddy.gold.goldpoint.golf.goo.goodhands.goodyear.goog.google.gop.got.gov.gp.gq.gr.grainger.graphics.gratis.green.gripe.grocery.group.gs.gt.gu.guardian.gucci.guge.guide.guitars.guru.gw.gy.hair.hamburg.hangout.haus.hbo.hdfc.hdfcbank.health.healthcare.help.helsinki.here.hermes.hgtv.hiphop.hisamitsu.hitachi.hiv.hk.hkt.hm.hn.hockey.holdings.holiday.homedepot.homegoods.homes.homesense.honda.honeywell.horse.hospital.host.hosting.hot.hoteles.hotels.hotmail.house.how.hr.hsbc.ht.htc.hu.hughes.hyatt.hyundai.ibm.icbc.ice.icu.id.ie.ieee.ifm.iinet.ikano.il.im.imamat.imdb.immo.immobilien.in.inc.industries.infiniti.info.ing.ink.institute.insurance.insure.int.intel.international.intuit.investments.io.ipiranga.iq.ir.irish.is.iselect.ismaili.ist.istanbul.it.itau.itv.iveco.iwc.jaguar.java.jcb.jcp.je.jeep.jetzt.jewelry.jio.jlc.jll.jm.jmp.jnj.jo.jobs.joburg.jot.joy.jp.jpmorgan.jprs.juegos.juniper.kaufen.kddi.ke.kerryhotels.kerrylogistics.kerryproperties.kfh.kg.kh.ki.kia.kids.kim.kinder.kindle.kitchen.kiwi.km.kn.koeln.komatsu.kosher.kp.kpmg.kpn.kr.krd.kred.kuokgroup.kw.ky.kyoto.kz.la.lacaixa.ladbrokes.lamborghini.lamer.lancaster.lancia.lancome.land.landrover.lanxess.lasalle.lat.latino.latrobe.law.lawyer.lb.lc.lds.lease.leclerc.lefrak.legal.lego.lexus.lgbt.li.liaison.lidl.life.lifeinsurance.lifestyle.lighting.like.lilly.limited.limo.lincoln.linde.link.lipsy.live.living.lixil.lk.llc.llp.loan.loans.locker.locus.loft.lol.london.lotte.lotto.love.lpl.lplfinancial.lr.ls.lt.ltd.ltda.lu.lundbeck.lupin.luxe.luxury.lv.ly.ma.macys.madrid.maif.maison.makeup.man.management.mango.map.market.marketing.markets.marriott.marshalls.maserati.mattel.mba.mc.mcd.mcdonalds.mckinsey.md.me.med.media.meet.melbourne.meme.memorial.men.menu.meo.merckmsd.metlife.mf.mg.mh.miami.microsoft.mil.mini.mint.mit.mitsubishi.mk.ml.mlb.mls.mm.mma.mn.mo.mobi.mobile.mobily.moda.moe.moi.mom.monash.money.monster.montblanc.mopar.mormon.mortgage.moscow.moto.motorcycles.mov.movie.movistar.mp.mq.mr.ms.msd.mt.mtn.mtpc.mtr.mu.museum.music.mutual.mutuelle.mv.mw.mx.my.mz.na.nab.nadex.nagoya.name.nationwide.natura.navy.nba.nc.ne.nec.net.netbank.netflix.network.neustar.new.newholland.news.next.nextdirect.nexus.nf.nfl.ng.ngo.nhk.ni.nico.nike.nikon.ninja.nissan.nissay.nl.no.nokia.northwesternmutual.norton.now.nowruz.nowtv.np.nr.nra.nrw.ntt.nu.nyc.nz.obi.observer.off.office.okinawa.olayan.olayangroup.oldnavy.ollo.om.omega.one.ong.onl.online.onyourside.ooo.open.oracle.orange.org.organic.orientexpress.origins.osaka.otsuka.ott.ovh.pa.page.pamperedchef.panasonic.panerai.paris.pars.partners.parts.party.passagens.pay.pccw.pe.pet.pf.pfizer.pg.ph.pharmacy.phd.philips.phone.photo.photography.photos.physio.piaget.pics.pictet.pictures.pid.pin.ping.pink.pioneer.pizza.pk.pl.place.play.playstation.plumbing.plus.pm.pn.pnc.pohl.poker.politie.porn.post.pr.pramerica.praxi.press.prime.pro.prod.productions.prof.progressive.promo.properties.property.protection.pru.prudential.ps.pt.pub.pw.pwc.py.qa.qpon.quebec.quest.qvc.racing.radio.raid.re.read.realestate.realtor.realty.recipes.red.redstone.redumbrella.rehab.reise.reisen.reit.reliance.ren.rent.rentals.repair.report.republican.rest.restaurant.review.reviews.rexroth.rich.richardli.ricoh.rightathome.ril.rio.rip.rmit.ro.rocher.rocks.rodeo.rogers.room.rs.rsvp.ru.rugby.ruhr.run.rw.rwe.ryukyu.sa.saarland.safe.safety.sakura.sale.salon.samsclub.samsung.sandvik.sandvikcoromant.sanofi.sap.sapo.sarl.sas.save.saxo.sb.sbi.sbs.sc.sca.scb.schaeffler.schmidt.scholarships.school.schule.schwarz.science.scjohnson.scor.scot.sd.se.search.seat.secure.security.seek.select.sener.services.ses.seven.sew.sex.sexy.sfr.sg.sh.shangrila.sharp.shaw.shell.shia.shiksha.shoes.shop.shopping.shouji.show.showtime.shriram.si.silk.sina.singles.site.sj.sk.ski.skin.sky.skype.sl.sling.sm.smart.smile.sn.sncf.so.soccer.social.softbank.software.sohu.solar.solutions.song.sony.soy.spa.space.spiegel.sport.spot.spreadbetting.sr.srl.srt.ss.st.stada.staples.star.starhub.statebank.statefarm.statoil.stc.stcgroup.stockholm.storage.store.stream.studio.study.style.su.sucks.supplies.supply.support.surf.surgery.suzuki.sv.swatch.swiftcover.swiss.sx.sy.sydney.symantec.systems.sz.tab.taipei.talk.taobao.target.tatamotors.tatar.tattoo.tax.taxi.tc.tci.td.tdk.team.tech.technology.tel.telecity.telefonica.temasek.tennis.teva.tf.tg.th.thd.theater.theatre.tiaa.tickets.tienda.tiffany.tips.tires.tirol.tj.tjmaxx.tjx.tk.tkmaxx.tl.tm.tmall.tn.to.today.tokyo.tools.top.toray.toshiba.total.tours.town.toyota.toys.tp.tr.trade.trading.training.travel.travelchannel.travelers.travelersinsurance.trust.trv.tt.tube.tui.tunes.tushu.tv.tvs.tw.tz.ua.ubank.ubs.uconnect.ug.uk.um.unicom.university.uno.uol.ups.us.uy.uz.va.vacations.vana.vanguard.vc.ve.vegas.ventures.verisign.versicherung.vet.vg.vi.viajes.video.vig.viking.villas.vin.vip.virgin.visa.vision.vista.vistaprint.viva.vivo.vlaanderen.vn.vodka.volkswagen.volvo.vote.voting.voto.voyage.vu.vuelos.wales.walmart.walter.wang.wanggou.warman.watch.watches.weather.weatherchannel.webcam.weber.website.wed.wedding.weibo.weir.wf.whoswho.wien.wiki.williamhill.win.windows.wine.winners.wme.wolterskluwer.woodside.work.works.world.wow.ws.wtc.wtf.xbox.xerox.xfinity.xihuan.xin.测试.कॉम.परीक्षा.セール.佛山.ಭಾರತ.慈善.集团.在线.한국.ଭାରତ.大众汽车.点看.คอม.ভাৰত.ভারত.八卦‏.ישראל‎‏.موقع‎.বাংলা.公益.公司.香格里拉.网站.移动.我爱你.москва.испытание.қаз.католик.онлайн.сайт.联通.срб.бг.бел‏.קום‎.时尚.微博.테스트.淡马锡.ファッション.орг.नेट.ストア.アマゾン.삼성.சிங்கப்பூர்.商标.商店.商城.дети.мкд‏.טעסט‎.ею.ポイント.新闻.工行.家電‏.كوم‎.中文网.中信.中国.中國.娱乐.谷歌.భారత్.ලංකා.電訊盈科.购物.測試.クラウド.ભારત.通販.भारतम्.भारत.भारोत‏.آزمایشی‎.பரிட்சை.网店.संगठन.餐厅.网络.ком.укр.香港.亚马逊.诺基亚.食品.δοκιμή.飞利浦‏.إختبار‎.台湾.台灣.手表.手机.мон‏.الجزائر‎‏.عمان‎‏.ارامكو‎‏.ایران‎‏.العليان‎‏.اتصالات‎‏.امارات‎‏.بازار‎‏.موريتانيا‎‏.پاکستان‎‏.الاردن‎‏.موبايلي‎‏.بارت‎‏.بھارت‎‏.المغرب‎‏.ابوظبي‎‏.البحرين‎‏.السعودية‎‏.ڀارت‎‏.كاثوليك‎‏.سودان‎‏.همراه‎‏.عراق‎‏.مليسيا‎.澳門.닷컴.政府‏.شبكة‎‏.بيتك‎‏.عرب‎.გე.机构.组织机构.健康.ไทย‏.سورية‎.招聘.рус.рф.珠宝‏.تونس‎.大拿.ລາວ.みんな.グーグル.ευ.ελ.世界.書籍.ഭാരതം.ਭਾਰਤ.网址.닷넷.コム.天主教.游戏.vermögensberater.vermögensberatung.企业.信息.嘉里大酒店.嘉里‏.مصر‎‏.قطر‎.广东.இலங்கை.இந்தியா.հայ.新加坡‏.فلسطين‎.テスト.政务.xperia.xxx.xyz.yachts.yahoo.yamaxun.yandex.ye.yodobashi.yoga.yokohama.you.youtube.yt.yun.za.zappos.zara.zero.zip.zippo.zm.zone.zuerich.zw.";
    return tld.indexOf(searchTLD) != -1
}
