$(document).ready(() => {
    let callData = new CallData();
    let listChosen = new ListChosen();


    const renderHTML = () => {
        callData.getListData()
            .done((result) => {
                // console.log(result)
                let contentNavPills = '';
                let contentPanes = '';

                result.navPills.forEach((ele, idx) => {
                    let active = idx === 0 ? 'active' : '';
                    let activePanes = idx === 0 ? 'active' : 'fade';

                    contentNavPills += getElmTabPill(ele.tabName, ele.showName, active);
                    contentPanes += `
                <div class="tab-pane container ${activePanes}" id="${ele.tabName}">
                    <div class="row">
                        ${renderTabPanes(ele.tabName, result.tabPanes)}
                    </div>
                </div>
                `;
                });

                $(".nav-pills").html(contentNavPills);
                $(".tab-content").html(contentPanes);
            })
            .fail((err) => {
                console.log(err);
            });
    }

    renderHTML();


    const getElmTabPill = (tabName, showName, active) => {
        return `
        <li class="nav-item">
            <a
            class="nav-link btn-default ${active}"
            data-toggle="pill"
            href="#${tabName}"
            >${showName}</a
            >
        </li>
        `;
    }

    const renderTabPanes = (tabName, tabPanes) => {
        let tempArr = null;
        let elmItem = null;
        switch (tabName) {
            case 'tabTopClothes':
                tempArr = getTypeArr('topclothes', tabPanes);
                elmItem = getElmItem(tempArr);
                break;

            case 'tabBotClothes':
                tempArr = getTypeArr('botclothes', tabPanes);
                elmItem = getElmItem(tempArr);
                break

            case 'tabShoes':
                tempArr = getTypeArr('shoes', tabPanes);
                elmItem = getElmItem(tempArr);
                break;

            case 'tabHandBags':
                tempArr = getTypeArr('handbags', tabPanes);
                elmItem = getElmItem(tempArr);
                break;

            case 'tabNecklaces':
                tempArr = getTypeArr('necklaces', tabPanes);
                elmItem = getElmItem(tempArr);
                break;

            case 'tabHairStyle':
                tempArr = getTypeArr('hairstyle', tabPanes);
                elmItem = getElmItem(tempArr);
                break;

            default:
                tempArr = getTypeArr('background', tabPanes);
                elmItem = getElmItem(tempArr);
                break;
        }
        return elmItem;
    }

    const getTypeArr = (tabType, data) => {
        let tempArr = data.filter(ele => {
            return ele.type === tabType;
        });

        return tempArr;
    }

    const getElmItem = (tempArr) => {
        // console.log(tempArr);
        return tempArr.reduce((temp, ele) => {
            return temp + `
            <div class="card text-center">
                <img
                src="${ele.imgSrc_jpg}"
                />
                <h4><b>${ele.name}</b></h4>
                <button data-id="${ele.id}" data-name="${ele.name}" data-type="${ele.type}" data-desc="${ele.desc}" data-imgsrcjpg="${ele.imgSrc_jpg}" data-imgsrcpng="${ele.imgSrc_png}" class="changeStyle">Thử đồ</button>
             </div>
            `;
        }, '');
    }

    const findIndex = (type) => {
        let indexFind = -1;
        if (listChosen.arr && listChosen.arr.length > 0) {
            listChosen.arr.forEach((ele, idx) => {
                if (ele.type === type) {
                    indexFind = idx;
                }
            });
        }
        return indexFind;
    }


    $("body").delegate(".changeStyle", "click", function () {
        let id = $(this).data("id");
        let type = $(this).data("type");
        let desc = $(this).data("desc");
        let name = $(this).data("name");
        let imgSrcjpg = $(this).data("imgsrcjpg");
        let imgSrcpng = $(this).data("imgsrcpng");

        let choseItem = new ChoseItem(id, type, name, desc, imgSrcjpg, imgSrcpng);
        // console.log(choseItem);
        let idx = findIndex(choseItem.type);

        console.log(idx);

        if (idx !== -1) {
            //Update
            listChosen.arr[idx] = choseItem;
        } else {
            //Add
            listChosen.addItem(choseItem);
        }

        renderContain(listChosen.arr);
        // console.log(listChosen);
    });

    const renderContain = (choseItem = []) => {
        console.log(choseItem);
        if (choseItem && choseItem.length > 0) {
            choseItem.forEach((ele) => {
                if (ele.type === 'topclothes') {
                    renderBikini(ele.imgSrc_png);
                } else if (ele.type === 'botclothes') {
                    renderBikiniBot(ele.imgSrc_png);
                } else if (ele.type === 'shoes') {
                    renderFeet(ele.imgSrc_png);
                }
            });
        }
    }

    const renderBikini = (imgPng) => {
        $(".bikinitop").css({
            width: "500px",
            height: "500px",
            background: `url(${imgPng})`,
            position: "absolute",
            top: "-9%",
            left: "-5%",
            zIndex: "3",
            transform: "scale(0.5)"
        });
    }

    const renderBikiniBot = (imgPng) => {
        $(".bikinibottom").css({
            width: "500px",
            height: "1000px",
            background: `url(${imgPng})`,
            position: "absolute",
            top: "-30%",
            left: "-5%",
            zIndex: "2",
            transform: "scale(0.5)"
        });
    }

    const renderFeet = (imgPng) => {
        $(".feet").css({
            width: "500px",
            height: "1000px",
            background: `url(${imgPng})`,
            position: "absolute",
            top: "-30%",
            left: "-5%",
            zIndex: "2",
            transform: "scale(0.5)"
        });
    }
})