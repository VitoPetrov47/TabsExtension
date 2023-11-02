let showOptions = $('#showOptions');
let selectMenu = $('.select-menu');
let options = $('#options');
let customSelect = $('.custom-select');

let addNewCategory = $('#addNewCategory');
let addCategoryForm = $('.add-category-form');

const loader = $('#loader');
const main = $('#main');

function getRandomColor() {
    let colors = [
        {
            bgColor: '#00d6ff',
            fntColor: '#0032ff'
        },
        {
            bgColor: '#195764',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#007e98',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#8be2ff',
            fntColor: '#556ab9'
        },
        {
            bgColor: '#8e62ff',
            fntColor: '#400096'
        },
        {
            bgColor: '#423365',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#7700de',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#fff426',
            fntColor: '#00502f'
        },
        {
            bgColor: '#00ff96',
            fntColor: '#00502f'
        },
        {
            bgColor: '#ff9f24',
            fntColor: '#5b2d00'
        },
        {
            bgColor: '#ff6800',
            fntColor: '#5b2d00'
        },
        {
            bgColor: '#ff008c',
            fntColor: '#7e0000'
        },
        {
            bgColor: '#790000',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#00FFA7FF',
            fntColor: '#003aff'
        },
        {
            bgColor: '#3fff00',
            fntColor: '#196400'
        },
        {
            bgColor: '#00a046',
            fntColor: '#ffffff'
        },
        {
            bgColor: '#9eff7e',
            fntColor: '#146200'
        },
        {
            bgColor: '#c1ff00',
            fntColor: '#527000'
        },
        {
            bgColor: '#ff71fd',
            fntColor: '#56000c'
        },
    ];
    let color = '';
    for (let i = 0; i < colors.length; i++) {
        color = colors[Math.floor(Math.random() * colors.length)];
    }
    console.log('color: ', color);
    return color;
}

let tabsInfo = [];
loadTabDates();

let categories = [];
localCategories();

//1
function localCategories() {
    if(localStorage.getItem('categories')) categories = JSON.parse(localStorage.getItem('categories'));
    // showCategories()
    setTimeout(showCategories, 500);
    console.log('LOCAL STORAGE: ', JSON.parse(localStorage.getItem('categories')));
}

$(document).on('click', '#addNewCategory', function () {
    if(addCategoryForm.css('display') == 'none') {
        addCategoryForm.css('display', 'block');
    } else {
        addCategoryForm.css('display', 'none');
    }
});

$(document).on('click', '#showOptions', function() {
    if(selectMenu.css('display') == 'none') {
        selectMenu.css('display', 'block');
    } else {
        selectMenu.css('display', 'none');
    }
});

//clean local storage
$(document).on('click', '#cleanStorage', function () {
    localStorage.clear();
    location.reload();
});

//2
//add new category
$(document).on('click', '#categoryAdd', function (event) {
    event.preventDefault();
    let categoryMessage = $('#category-message');

    if(categories.length < 20) {
        let categoryName = $('#categoryName');
        let categoryBody = $('#categoryBody');

        let correctBody = categoryBody.val().replace(/,\s*/g, ', ');
        const inputArray = correctBody.split(', ');

        let category = {
            name: categoryName.val(),
            keywords: inputArray
        };
        categories.push(category);
        categoryName.val('');
        categoryBody.val('');
        saveCategories();
        localCategories();
        addCategoryForm.css('display', 'none');
        location.reload();
    } else {
        // alert('The local storage is full!');
        categoryMessage.css('display', 'block')
        setTimeout(function () {
            categoryMessage.css('display', 'none')
        }, 5000)
    }
});
//cancel add category
$(document).on('click', '#categoryCancel', function (event) {
    event.preventDefault();
    let categoryName = $('#categoryName');
    let categoryBody = $('#categoryBody');
    categoryName.val('');
    categoryBody.val('');
    addCategoryForm.css('display', 'none');
    location.reload();
});

//delete category
function deleteCategory(item) {
    console.log('item: ', item);
    // localStorage.removeItem(item);
    let items = JSON.parse(localStorage.getItem('categories'));
    // console.log(items.splice(item, 1));
    items.splice(item, 1);
    console.log(categories);
    localStorage.setItem('categories', JSON.stringify(items))
    location.reload()
}

//3
function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

// 2 || 4
function showCategories() {
    if(categories.length === 0) {
    } else {
        for(let i = 0; i < categories.length; i++) {
            //creat Selector button
            let textTitle = categories[i].name
            if(textTitle.length > 8) {
                textTitle = textTitle.slice(0, 8) + '...'
            }
            let newSelectBtn = $('<button></button>', {
                class: `new-select-btn-${i} custom-btn`,
                text: textTitle
            });
            let color = getRandomColor()
            newSelectBtn.css('background', `${color.bgColor}`)
            newSelectBtn.css('color', `${color.fntColor}`)
            showOptions.after(newSelectBtn);

            //creat Options
            let newCategoryMenu = $('<div></div>', {
                class: `category-content-${i} category-content-menu`,
                css: {
                    display: 'none'
                }
            });
            //creat Options block
            let newCategoryMenuBlock = $('<div></div>', {
                class: `category-block-menu`,
            });
            //creat Edit option
            let editOption = $('<div></div>', {
                class: `edit-option`,
            })
            let editOptionButton = $('<button></button>', {
                class: `edit-option-btn-${i} edit-option-btn`,
                text: 'Edit',
            })
            let deleteOptionButton = $('<button></button>', {
                class: `delete-option-btn-${i} delete-option-btn`,
                text: 'Delete',
            })

            editOption.append(editOptionButton);
            newCategoryMenu.append(editOption);

            editOption.append(deleteOptionButton);

            customSelect.append(newCategoryMenu);
            const regex = new RegExp(categories[i].keywords.join('|'), 'i');
            const filteredLinks = tabsInfo.filter(link => regex.test(link.url));
            newSelectBtn.on('click', function () {
                if(newCategoryMenu.css('display') == 'none') {
                    newCategoryMenu.css('display', 'block');
                } else {
                    newCategoryMenu.css('display', 'none');
                }
            });

            //edit
            let localData = JSON.parse(localStorage.getItem('categories'));
            let getName = localData[i].name;
            let getKeywords = localData[i].keywords.join(', ');
            let modalEditWindow = $(`
                <div class="edit-content-${i} edit-content-block" style="display: none">
                    <form class="form-edit-${i} form-edit-content">
                        <label class="form-edit-name">Name:</label>
                        <input class="form-edit-name-input" type="text" value="${getName}">
                        <label class="form-edit-keyword">Keywords:</label>
                        <input class="form-edit-keyword-input" type="text" value="${getKeywords}">
                        <div class="form-edit-decide-btn">
                            <button class="edit-accept-${i} edit-accept-btn">Accept</button>
                            <button class="edit-cancel-${i} edit-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
                `);
            newCategoryMenu.append(modalEditWindow);
            newCategoryMenu.append(newCategoryMenuBlock);
            // modalEditWindow.after(editOption);

            let showForm = $(`.edit-content-${i}`)
            let acceptBtn = $(`.edit-accept-${i}`)
            let cancelBtn = $(`.edit-cancel-${i}`)

            editOptionButton.on('click', function () {
                if(showForm.css('display') == 'none') {
                    showForm.css('display', 'block');
                } else {
                    showForm.css('display', 'none');
                }
            });
            deleteOptionButton.on('click', function () {
                deleteCategory(i);
                // console.log('delete action: ' + i);
            })

            acceptBtn.on('click', function () {
                // event.preventDefault();
                let newName = modalEditWindow.find('input[type="text"]').eq(0).val();
                let newKeywords = modalEditWindow.find('input[type="text"]').eq(1).val();
                newKeywords = newKeywords.replace(/,\s*/g, ', ');
                let turnArray = newKeywords.split(', ');
                console.log('turnArray: ', turnArray);
                if (turnArray[turnArray.length-1] === "") {
                    turnArray.pop();
                }
                turnArray = turnArray.filter(Boolean);
                console.log('turnArray: ', turnArray);
                localData[i].name = newName;
                localData[i].keywords = turnArray;
                localStorage.setItem('categories', JSON.stringify(localData));
                showForm.css('display', 'none');
            })
            cancelBtn.on('click', function () {
                showForm.css('display', 'none');
            })

            outLinks(filteredLinks, newCategoryMenuBlock);
        }
    }
}
//5
function outLinks(arrLinks, newCategoryMenu) {
    $.each(arrLinks, function(i, link) {
        const btnLink = $('<button>').attr({
            'id': `tabUrl${i}`,
            class: 'tab-url-option',
            'data-tab-id': link.idSite
        }).text(link.title.slice(0, 10)).appendTo(newCategoryMenu);
        const imgIconLink = $('<img>').attr({
            'id': `imgIconLink${i}`,
            'src': link.iconUrl
        }).css({
            'width': '20px',
            'height': '20px'
        }).appendTo(btnLink);
        btnLink.on('click', function() {
            chrome.tabs.update(parseInt($(this).attr('data-tab-id')), { active: true, 'highlighted': false });
        });
    });
}

let countTabs = $('#countTabs');

chrome.tabs.query({}, function(tabList) {
    console.log(tabList.length);
    countTabs.text(tabList.length);
});
//0
function loadTabDates() {
    try {
        $('#loader').show();
        $('#main').hide();
        chrome.tabs.query({}, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                let tabId = tabs[i].id;
                chrome.tabs.get(tabId, function (tab) {
                    let tabInfo = {
                        title: tab.title,
                        url: tab.url,
                        idSite: tab.id,
                        iconUrl: tab.favIconUrl
                    };
                    const btn = $('<button>', {
                        class: `btn-tab-option`
                    });
                    const imgIcon = $('<img>');
                    imgIcon.attr('id', `imgIcon${i}`);
                    imgIcon.attr('src', tab.favIconUrl);
                    imgIcon.css({width: '18px', height: '18px'});
                    btn.attr('id', `tabUrl${i}`);
                    let textTitle = tab.title
                    if(textTitle.length > 8) {
                        textTitle = textTitle.slice(0, 10) + '...'
                    }
                    btn.text(textTitle);
                    btn.attr('data-tab-id', tab.id);
                    $('#options').append(btn);
                    btn.append(imgIcon);

                    btn.click(function() {
                        chrome.tabs.update(parseInt($(this).attr('data-tab-id')), { active: true, 'highlighted': false });
                    });

                    tabsInfo.push(tabInfo);
                });
            }
            $('#loader').hide();
            $('#main').show();
        });
    } catch (e) {
        console.log(e);
        $('#loader').hide();
    }
}