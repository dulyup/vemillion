( () => {

let count=0;
const cards=prestoredCards();
const fav=[];
const custom={};

function addCustom(side0, side1){
    custom[count.toString()]=newCard(side0, side1);
}

function deleteCustom(id){
    delete custom.id;
}

function addFav(id){
    fav.push(id);
}

function deleteFav(id){
    for (let i = fav.length-1; i >= 0; i--) {
        if (fav[i] === id) {
            fav.splice(i, 1);
            break;
        }
    }
}

function getAllPrestoredCards(){
    return cards;
}

function getAllCustomCards(){
    return custom;
}

function getAllFavCards(){
    return fav.reduce(function(fav, cur, i) {
        fav[i] = cur;
        return fav;
    }, {});
}

function getCardById(id){
    if (id>cards.length) return custom[id.toString()];
    else return cards[id];
}

function newCard(side0, side1){
    const card={};
    card.id=count++;
    card.side0=side0;
    card.side1=side1;    
    return card;
}

function prestoredCards(){
return `surgery|u外科,外科學;c外科手術室,工作室
massive|(a.)大而重的,寬大的,宏偉的
quote|引用(vt.)引述,舉証,報價(vi.)引用
particularly|(ad.)特別,尤其,格外;詳細地,細致地
discharge|(vt.)卸;流出,排出,放;發射;釋放,解雇;使免除,使卸脫卸貨;流出,排出,放電
establish|(vt.)建立,設立;安置,使定居;確立,使確認
talented|(a.)有才能的;多才的
across|穿過,橫穿,越過,橫跨;與...交叉;遍及交叉,十字架
divide|(vt.)除;分配,分享;分歧(vi.)分,分開;分裂,意見分歧;除,分,劃分;分開,隔開
pleasant|(a.)愉快的,可愛的,親切的
convey|(vt.)運送,運輸;傳達,轉達;傳播
blurry|(a.)模糊的,不清楚的,汙臟的
conquer|(vt.)克服,征服,戰勝(vi.)得勝
victim|受害人,犧牲者,犧牲品
pattern|圖案,模範,榜樣;型,式樣;樣品;圖樣(vt.)摹制,仿造;以圖案裝飾
ultimate|終極,根本,頂點,基本原理(a.)終極的,根本的,極限的,最遠的,最後的,最大的
weird|(a.)怪異的,超自然的,不可思議的,超乎事理之外的命運,預言,符咒
process|程序,進行,過程(vt.)加工,處理,對...處置,對...起訴(a.)經加工的,三色版的
hop|單腳跳,跳躍,舞會,飛行,蛇麻草(vi.)單腳跳,跳躍,長蛇麻子(vt.)躍過,跳上 ; (對路由器來說,從發送端至接收端構成的路徑, 都由一組跳躍點構成)
financial|(a.)財政的,經濟的,財務的,金融的
encourage|(vt.)鼓勵,支援,激勵
master|男主人,雇主;師傅,能手;男教師,院長;大師,名家,名家作品;碩士(vt.)精通
pity|遺憾,同情,憐憫,憾事,可惜(vt.)同情,憐憫(vi.)可憐
commerce|商業,商務,貿易
fairly|(ad.)公正地,正當地;相當;完全,簡直
previous|(a.)早先的,前面的,過急的(ad.)早先,前面
crowd|群眾,一夥(vt.)擁擠,擠滿,擠進
scale|比例,刻度,衡量,比例尺,數值範圍,等級,規模,天平,秤盤,秤,鱗,鱗片,積垢
jerk|性情古怪的人,急拉,肌肉抽搐,牛肉幹(vi.)痙攣,急拉,急推(vt.)猛拉
unify|(vt.)統一,使成一體
prefer|(v.)寧願,更喜歡;提出;提升
logical|(a.)邏輯的,符合邏輯的
behalf|代表,利益,支援
awesome|(a.)引起敬畏的,可怕的
oatmeal|燕麥片,燕麥粥
initiate|入會,開始(a.)新加入的(vt.)開始,傳授
indicate|(vt.)顯示,象徵,指示,指出
opposite|(a.)對面的對立面,對立物在...的對面
slot|水溝,細長的孔,硬幣投幣口,縫,狹槽,狹通道,位置,足跡(vt.)開槽於,跟蹤
expression|表達,表示;詞句,措辭;式,符號;表情,臉色
situation|形勢,局面;位置,地點;職位,職務
act|行為,幕,法案,動作(vi.)行動,表演,盡職責,假裝(vt.)扮演,裝作,下判決
lively|(a.)活潑的,活躍的;栩栩如生的,真實的
semblance|外表,偽裝
wrench|扳鉗,扳手,猛扭,扭傷,歪曲,痛苦(vt.)猛扭,扭傷,曲解,搶,折磨(vi.)猛扭
trade|貿易,商業,交易,生意,職業,顧客,信風(vi.)交易,買賣,經商,對換
reduce|(vt.)減少,分解,降低,使變為,把...分解,把...歸納(vi.)減少,變瘦
psychology|心理學,心理狀態
whole|全部,全體,整體,完全之體系(a.)所有的,完整的,完全的,純粹的
receive|(vt.)收到,接受,得到,接待,迎接,承受(vi.)收到,會客
chase|追求,狩獵,追逐(vt.)追捕,追逐,雕刻,在金屬上打花樣(vi.)追趕,奔跑
virtually|(ad.)實質上,實際上
snore|鼾聲,打鼾(vi.)打鼾(vt.)打鼾度過
Fahrenheit|華氏溫度計
engage|(vt.)使從事於,使忙著;使訂婚;雇用,聘;接合,嚙合(vi.)從事於,參加
meantime|此際,其時(ad.)其間
atmosphere|大氣,空氣,氣氛,大氣層,大氣圈
stuff|原料,要素,東西,材料,素質,織品,廢物,廢話(vt.)裝填(vi.)狼吞虎咽
delivery|遞送,投遞,交付;發表;提供,釋放;助產,分娩
excitement|刺激,興奮,刺激的事物
exaggerate|(vt.)誇張,誇大(vi.)誇張,誇大
worn|(a.)磨損的,疲倦的(vbl.)wear的過去分詞
disappoint|(vt.)使失望,使受挫折
gamble|冒險(vi.)(vt.)賭博,孤注一擲
organize|(vt.)組織,有機化,給予生機(vi.)組織起來
illustrate|(vt.)舉例說明,作圖解,闡明(vi.)舉例
layman|俗人,門外漢,凡人
slack|鬆弛,靜止,淡季,閑散,家常褲(a.)鬆弛的,不流暢的,疏忽的,懶散的,無力的
accord|(v.)一致,符合,和諧,協調;給予,使一致;自願,主動
eyesight|u視力,視野
aid|幫助,有助之物,助手(vt.)援助,幫助
barge|駁船,平底貨船,舢板(v.)相撞,闖入
digestion|消化力,領悟
wax|蠟,蠟狀物,震怒,增加,月亮由虧轉盈(vi.)變大,增大,月亮漸滿(vt.)上蠟於
evidence|u根據,証據;形跡,跡象
stick|棍,棒,刺,枯枝,莖,條狀物(vt.)插於,刺入,釘住,伸出,粘貼,使停止(vi.)粘住;[美俚]大麻煙卷
concept|概念,觀念,思想
terminate|(a.)有結尾的,有限的(vi.)結束,終止,滿期(vt.)使停止,使結束,使終止
revolution|革命,變革;旋轉,運轉,公轉;周期
buck|元,雄鹿,紈□子弟,鞍馬,莊家標志,鹼水,自誇,談話(vi.)馬背突然拱起,反對
prove|(vt.)証明,查驗,檢驗,勘探,顯示(vi.)証明是
bury|(vt.)埋葬,掩埋,埋頭,專心
stimulating|(a.)刺激的,有刺激性的
topic|題目,標題,論題,話題
typical|(a.)典型的,象徵的,有代表性的
increase|增加,增進,利益(vt.)增加,加大(vi.)增加,繁殖
inevitably|(ad.)不可避免地
silent|(a.)沈默的,安靜的,寂靜的,矜持的,緘默的
tragic|(a.)悲慘的,悲劇的
concern|(vt.)涉及,關系到;使關心,掛念c關系;u關心,掛念
trick|詭計,欺詐,謀略,惡作劇,癖好,決竅(vt.)戲弄,欺騙,裝飾(vi.)哄騙
metric|(a.)公尺的,公制的,計量的
spectacular|(a.)公開展示的,驚人的展覽物
bless|(v.)祝福,感激,保佑,保護
thoughtful|(a.)沈思的,思考的;表達思想的;體貼的
mysterious|(a.)神秘的,難解的,不可思議的
phrase|片語,慣用語,成語,措詞(vt.)用短語表達
issue|c流出,放出;u發行;c問題(vt.)使流出,放出;發行,發布;發給,配給(vi.)出
grocery|食品,雜貨;食品雜貨店
perseverance|毅力,忍耐,不屈不撓
piss|小便,尿(v.)撒尿;發怒,厭煩
sensitive|(a.)敏感的,靈敏的,過敏的,感光的
partly|(ad.)在一定程度上,部分地,不完全地
vulnerable|(a.)易受傷害的,有弱點的,易受攻擊的,脆弱的,成局的
properly|(ad.)適當地;正當地;嚴格地
authority|u權,權力;u職權,權限;當局,官方;c權威
accustomed|(a.)習慣了的
application|申請,申請書;應用,用途;勤奮,勤勉
enforce|(vt.)實施,執行;強制,強迫;加強
Celsius|攝氏
mar|(vt.)損毀,損傷,糟蹋三月
measure|(vt.)量,測量;打量,估量,衡量u尺寸,大小;c量度的單位,標準;c量度器;措施
instance|例子,事例,實例;場合,情況(vt.)舉...為例,引証;用例子說明
upset|(a.)煩亂的,不高興(vt.)顛覆,推翻,擾亂,使不適,使心煩(vi.)翻倒
fuel|燃料,木炭(vt.)加燃料,供以燃料(vi.)得到燃料
grab|抓握,掠奪,強占,挖掘機(vi.)抓取,搶去(vt.)攫取,霸佔
tend|(vt.)照管,照料(vi.)服侍,招待;注意,留心;走向,趨向;傾向;有助於
quiz|小考,隨堂測驗,惡作劇(vt.)嘲弄,簡單測驗,惡作劇
capture|抓取,戰利品,捕獲之物(vt.)抓取,獲得,迷住
drone|雄蜂,懶惰者,嗡嗡的聲音,靶標(vi.)嗡嗡作聲,混日子(vt.)低沈地說出,無人機
articulate|(a.)有關節的,發音清晰的(vt.)以關節連接,接合,明白地說
utility|實用程式,工具公用程式,實用品,實用,公用事業(a.)實用的,有多種用途的
imperial|(a.)帝王的,至尊的,壯麗的特等品
penny|便士,一分,小錢
portion|部分,一份,命運,嫁妝(vt.)將...分配,分配,給...嫁妝
affect|(vt.)影響,妨害,感動,感染,感動;假裝,冒充;常去...
tenacity|固執,不屈不撓,頑固,堅韌
curiosity|好奇心,新奇的事物,珍品
summarize|(vt.)(vi.)概述,總結,摘要而言
crew|全體人員,群眾,全體機員
crucial|(a.)決定性的,重要的,嚴厲的
content|內容,滿足,意義,要旨(a.)滿足的,滿意的,意義的(vt.)使...滿足
struggle|鬥爭,戰鬥;掙紮,努力(vi.)掙紮鬥爭,奮鬥
aisle|走廊,通道,過道
anxiety|u掛念,憂慮;渴望,熱望
definitely|(ad.)一定地,肯定地;明確地,確切地
integrate|(vt.)綜合,使結合,使成整體(vi.)成一體(a.)完整的,完全的
reference|u提及,涉及;u參考,查閱;c証明書,介紹信;u關系,關聯
imitate|(vt.)模仿,仿效,摹擬,學樣;仿製,仿造,偽造
exception|例外,除外;u反對,異議
cane|手杖,細長的莖,藤條(vt.)以杖擊,以藤編制的
shame|u羞愧,羞恥;c可恥的人(vt.)使羞愧,恥辱
opportunity|機會,機遇,湊巧,方便
somehow|(ad.)以某種方式,不知怎麼的
bold|粗體( 列印 ); 鮮明( 螢幕 )
intellectual|有知識者,知識分子,憑理智做事者(a.)智力的,知性的,聰明的
depend|(vi.)依靠,依賴;依...而定,取決於;相信,信賴
technique|u技巧,技術;c技術,方法
favour|favo(u)r c恩惠,善意的行為;u好感,喜愛(vt.)贊成,有利於;偏愛,偏袒
transportation|運輸,輸送,交通業
effort|努力,艱難的嘗試
dosage|劑量,用量,配藥
mad|(a.)瘋狂的,發瘋的,生氣的,愚蠢的,狂歡的狂怒
switch|開關,電閘,轉換,軟枝(vt.)轉變,切換,擺動,轉換,使轉軌(vi.)轉換,變換,擺動
teller|講話者,告訴者,出納員
inefficient|(a.)無效率的,無能的
potential|潛在性,可能性,潛力,潛能,勢,位(a.)有潛力的,可能的,潛在的
barrage|掩護炮火,猛烈的炮火,連珠炮,彈幕,接二連三的射擊
especially|(ad.)尤其,特別,格外
forecast|趨勢預測預想,預測,預報(vt.)預想,預測,預報
enthusiasm|熱情,熱誠,熱心
among|在...中間
accountable|(a.)負有責任的,可以說明的,能夠解釋的
sophisticated|(a.)老練的,老於世故的;復雜的,尖端的
fill|(vt.)填充,彌漫,供給,滿足,供應(vi.)充滿滿足,裝滿,充分,填方(v.)填充,裝滿
sneeze|(v.)噴嚏;蔑視,輕視
represent|(vt.)表現,表示,描繪,講述,聲稱,代表,象徵,扮演,回憶,再贈送
further|(a.)更遠的,此外的,更多的(vt.)促進,增進,助長(ad.)更進一步地,更遠地,此外
dial|(vt.)撥,打電話(vi.)撥,打電話鐘面,刻度盤,撥號盤
destination|目的地目的文件,目的單元
paragraph|段落,短評(vt.)將...分段,分段落(vi.)寫短評段落
setback|頓挫,挫折,退步
suffer|(vi.)受苦,受痛苦(vt.)受到,遭受;忍受,容忍
bully|欺淩弱小者,土霸(vt.)威脅,恐嚇,欺負(vi.)欺負(a.)好的,第一流的(ad.)十分
chart|圖表圖解,海圖(vt.)製成圖表
ruin|毀滅,推翻,廢墟(vi.)毀滅,衰敗,破壞,破產,墮落(vt.)使毀滅,毀壞,使破產
permission|准許,允許,許可証
individual|(a.)個人的,個體的,單獨的;獨特的個人,個體;人
reverse|相反,背面,倒退,挫折,失敗(a.)反面的,相反的,反向的,顛倒的(vt.)顛倒,逆轉
consume|(vt.)消耗,消費,消滅(vi.)消滅,毀滅
miraculous|(a.)奇跡的,不可思議的
ounce|盎司,少量,雪豹
pronunciation|發音,讀法
sort|(v.)排序,挑選,分揀種類,類別,性質,程度
fluency|流暢,雄辯,善辯
access|訪問通路,進入,使用權,發作
extreme|(a.)末端的,盡頭的;極度的,極端的極度,最大程度
train|火車,列車,行列,長隊,後果,順序(vt.)訓練,教養,對准(vi.)鍛煉
obvious|(a.)明顯的,明白的,顯然的
native|本地人,土產,土人(a.)本國的,與生俱來的,自然的
autobiography|自傳
lecture|c演講,講課;嚴責,長篇大論的教訓(vi.)講演,講課(vt.)向...講演,給...講課
resist|(vt.)(vi.)抵抗,耐得住,抵制,反抗防染劑
beam|光線,橫梁,容光煥發(vi.)微笑,閃亮(vt.)上梁,發射
relevant|(a.)有關聯的,中肯的,有關系的,適當的,成比例的,相應的
sanitation|[公共] 衛生[設備]
material|材料,物資,素材,布料,資料(a.)物質的,肉體的,具體的
ratify|(vt.)批准,認可
congress|國會,會議,討論會
corpse|屍體
magnitude|巨大,重大,重要,大小,數量,光度
globe|球,球狀物,地球儀,天體(vi.)(vt.)(使)成球狀
consistent|(a.)一致的,始終如一的;堅固的,堅實的
direct|(a.)直接的,徑直的;直截了當的,直率的(ad.)徑直地,直接地(vt.)管理,指導,指揮
guarantee|擔保,抵押品,保証書(vt.)保証,擔保
filter|(vt.)過濾,滲透,走漏(vi.)濾過,滲入過濾器,篩選濾波器,過濾器,濾光器
mercury|水銀,汞,使者,墨丘利神
contact|互通資訊,交際,互通意見,接觸(vi.)接觸,會晤,交際(vt.)使接觸(a.)有聯系的
diminish|(vt.)(vi.)(使)減少,(使)變小
knuckle|指節,蹄爪,膝關節(vt.)(vi.)以指節打,以手指射
fault|過錯,故障,毛病(vt.)挑剔(vi.)弄錯
comprehension|理解,領悟
confident|(a.)確信的,自信的,有信心的
satellite|衛星,人造衛星;衛星國,隨從
specialize|(vt.)使特殊化,列舉,特別指明,限定...的範圍(vi.)成為專家,專攻
judge|法官,審判官,推事(vt.)審理,鑒定,判斷,判決,裁定(vi.)下判斷,作評價
trend|趨勢,傾向,方位(vi.)傾向,轉向趨勢
constitution|c憲法;u體格,體質;u構成,構造,組成
debate|(vt.)爭論,辯論(vi.)辯論爭論,辯論
navigation|航行,航海,航空,導航,駕駛;通過
plug|塞子,消防栓,電插頭(vt.)插入,塞住,接插頭(vi.)被塞住
ensure|(vt.)保証,擔保;保護,使安全
exclusive|(a.)排外的,排他的,專有的,清一色的,不包括的
term|術語,名詞,期限,學期,任期,限期,開庭期,條件,條款,價錢,關系,地位,項
clutch|抓緊,掌握,離合器,一窩小雞(vt.)抓住,踩汽車離合器(vi.)抓
realise|(v.)覺悟;明白;實現;兌現
aesthetic|(a.)美學的,審美的,有美感
outcome|結果,出口,演變
conversion|轉換轉變,改宗,換位
thermometer|溫度計,寒暑表
quantity|量,數量,許多,大量
reveal|(vt.)露出,顯示,透露,揭露,泄露,(神)啟示窗側,門側
voluntary|(a.)自動的,自願的,故意的,志願的,非官辦的,自發的即興演奏,志願者
period|時期,周期,時代,現代,當代;學時,課時,一節課;句號,結束(a.)某一時代的
bizarre|(a.)奇異的
spirit|精神,靈魂,神靈,幽靈,鬼怪;心情,情緒;氣概,勇氣(v.)鼓舞,鼓勵;誘拐,帶走
fridge|電冰箱
grasp|把握,抓緊,抓,柄,控制,理解(vt.)抓住,緊握,領會(vi.)抓
operation|運轉,運作,工作,生效,起作用;手術,開刀;軍事行動,作戰
invest|(vt.)給...著衣;投(vi.)投資;買進
meditation|沈思,冥想
psychologist|心理學者
crush|壓碎,粉碎,群眾,迷戀(vt.)壓破,征服,沖入,弄皺,擠入(vi.)被壓碎,起皺,擠
definition|u定義;限定,確定;清晰度
anonymous|無記錄(a.)作者不詳的,佚名的,無名的
generation|u產生,發生;c一代,一代人
consequence|結果,後果;推理,推斷;重要性
reach|伸出,延伸,區域,範圍,河段,岬(vt.)到達,達到,伸出,延伸,影響(vi.)達到
react|re-act (vt.)重作,重演
dump|垃圾場(vt.)切斷電源,傾倒,傾銷(vi.)倒垃圾,傾銷商品
numerous|(a.)很多的,數目眾多的,多數的
decline|衰微,跌落,下降(vt.)使降低,婉謝(vi.)下降,衰落,偏斜
dub|(vt.)配音,輕點,授予稱號,打擊一下擊鼓聲,笨蛋
reduction|縮小,減少,降低;簡化,簡約;還原,復原
rid|(v.)擺脫,除掉,克服,幹掉,消滅
absolutely|(ad.)完全地,絕對地,正是如此
intense|(a.)非常的,強烈的,緊張的,熱情的
worthwhile|(a.)值得花時間的,值得做的,相宜的
mustard|芥末,芥菜,強烈的興趣
impatient|(a.)不耐煩的,急躁的,忍受不了的;急欲的,急切的
consumption|消費,消費量,憔悴
proof|証據,証明,試驗,檢驗,考驗(a.)不能透入的,証明用的,防...的
tap|輕打,水龍頭(vt.)輕打,輕敲,敲打出,選擇,裝上嘴子,使流出,開發,召集,分接
instead|(ad.)改為,抵作,更換,替代
discomfort|不便之處,不適
complicate|(vt.)弄復雜,使錯綜,使起糾紛(vi.)變復雜
deteriorate|(vt.)(vi.)(使)惡化
category|種類,類項
plural|復數(a.)復數的,兩個以上的,復性的
accent|腔調,地方口音;重音(v.)著重,強調
agency|媒介,代理,機構,旅行社,通訊社;作用,動力,力量
petrol|u汽油
favor|好意,喜愛(vt.)支援,喜歡,証實
excessive|(a.)過度的,格外的,極端的
discuss|(vt.)討論,商議
lean|(vi.)傾斜,屈身;倚,靠,依賴(vt.)使傾斜;把...靠在某種東西上傾斜,傾向
distract|(v.)分散,岔開;弄昏,使煩惱;消遣,娛樂
demonstrate|(v.)示威;論証,示範,顯示,展示,演示,表示
conclusion|總結,結束,決定,結論
frustrate|(vt.)挫敗,擊敗,破壞(a.)無益的,挫敗的,挫折的
innovate|(vi.)改革,創新
articulation|關節,接合,清晰發音
twister|纏繞者,纏繞機,歪曲事實的人
constantly|(ad.)不變地,不斷地,時常地
fart|屁(vi.)放屁
blame|(vt.)責備,責怪,把...歸咎於過錯,責任
animation|活潑,生氣,卡通製作
template|模板,樣板
font|字體,字形,洗禮盤,泉字體字體,字形
ark|方舟,箱子,櫃
board|委員會,理事會,董事會,委員會;司,局,廳;木板,黑板(v.)提供膳宿,搭夥;登上
marijuana|大麻
tweet|(vi.)鳴叫小鳥叫聲,自錄音再現裝置發出之高音
physically|(ad.)身體上地
rolled|(a.)包金箔的
empower|(vt.)授予權力,允許,使能夠
educator|教育者,教育工作者
perk|(vi.)昂首,振作,滲透(vt.)豎起,打扮,滲透小費
technically|(ad.)技術上,學術上,專門地
adorable|(a.)可崇拜的,值得敬慕的,可愛的
empathy|(a.)移情作用的
politely|(ad.)殷勤地,優雅地,委婉地
incredibly|(ad.)不能相信地
inspiring|(a.)鼓舞人心的
collaborative|共同
mandatory|(a.)命令的,託管的
overdose|配藥量過多(vt.)配藥過量,使服藥
swirl|漩渦,渦狀形(vt.)使成漩渦(vi.)打漩,盤繞,頭暈
sewage|臟水,污水(vt.)用污水灌溉
slush|爛泥,雪水(vt.)濺濕,灌泥漿於(vi.)跋涉
freaking|嚇壞
laptop|膝上型電腦,筆記型電腦
impressed|留下深刻的印象
exhilarating|(a.)令人喜歡的,使人愉快的,爽快的
flex|(vt.)彎曲,伸縮,折曲(vi.)彎曲電線,松緊帶
brief|摘要,簡報,公事包(a.)簡短的,短暫的(vt.)對...作簡報,摘要,節錄
nudge|輕推,用肘輕推,悄悄推,引起注意
chronologically|(ad.)按年代地
brag|(v.)吹噓,吹牛,誇耀,自誇
recess|休息,休會,放假,凹進處,深處,隱窩(vt.)使凹進(vi.)休假,休息
efficiently|高效地
vastness|廣大
supple|(a.)柔軟的,逢迎的,順從的(vt.)使柔軟,使順從
preferably|最好
fetal|胎
burp|飽嗝兒,打嗝(vi.)(vt.)打飽嗝
disband|(vt.)解散,使退伍(vi.)解散
certification|出証明
credential|國書,憑據,印信
biologically|(ad.)生物學上
deodorant|除臭藥,防臭劑(a.)止臭的,防臭的
punctuation|標點標點符號
hump|圓形隆起物,瘤(vi.)隆起成圓丘形,弓起,努力(vt.)使弓起,使努力幹
grit|砂礫,粗砂石(vt.)覆以砂礫,摩擦(vi.)摩擦作聲
inversion|倒轉,否定,倒置
ergo|(ad.)因此;由是
corrosive|(a.)腐蝕的,腐蝕性的,蝕壞的腐蝕物,腐蝕劑
squint|斜視眼,斜著(a.)斜視的(vt.)使變斜視眼(vi.)斜視,傾向,越軌
monologue|獨白;獨腳劇;獨演
tiled|平鋪
colossal|(a.)巨大的,巨像似的
sizzle|(vi.)嘶嘶做聲(vt.)燒灼□□聲
accountability|有責任,有義務
ogle|眉目傳情(vt.)注視(vi.)做媚眼
puncture|刺痕,穿刺(vt.)刺穿,刺,揭穿(vi.)被刺穿
peeve|(vt.)(vi.)(使)氣惱,(使)焦躁,(使)忿怒麻煩的事物,怨恨,觸怒
aye|贊成票,投贊成票者(ad.)永久地
snuggle|(vi.)偎依(vt.)使舒適溫暖,緊抱
sustenance|生計,食物
flawless|(a.)無瑕疵的,無缺點的
unwillingness|不願意;不情願
perspire|(vt.)(vi.)出汗,流汗
optometrist|驗光師,視力測定者
selfless|(a.)不顧自己的,無私心的,無私欲的
unintentional|(a.)無心的,無意識的,不是故意的
millennial|(a.)一千年的;千福年的
binder|縛者,用以綁縛之物,夾器
spil|矽品
tress|頭發一束,卷發,發辮
chivalrous|(a.)騎士的,勇敢的
sniffily|sniff.i.ly [ˋsnifәli; ˋsnifili] &lt;&lt;副詞&gt;&gt; 嗤之以鼻地; 輕蔑地
oration|演說,致辭,敘述法
unsteady|(a.)不安定的;易變的;不穩的
squatter|蹲著的人(vi.)涉水而過
proofread|(vt.)校正,校對
casserole|餐桌上用有蓋的焙盤,砂鍋菜
hyphen|連字號(vt.)以連字號連接
astigmatism|散光
resp|反映
induct|(vt.)引導,使入門,引入,使就職
bifocal|(a.)雙焦點的
gamesmanship|攪亂戰術`.split("\n").map(line => newCard(line.split("|")[0],line.split("|")[1]));
}

})();