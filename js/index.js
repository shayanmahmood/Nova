// signUP and login functionality
const
    signInBtn = document.getElementById("signIn"),
    signUpBtn = document.getElementById("signUp"),
    container = document.querySelector(".container"),
    // sumbits inputs
    signUpButton = document.querySelector('.submitLogin'),
    loginInButton = document.querySelector('.submitloginIn'),

    //admin
    adminAppendChildBox = document.querySelector('.appendChildBOO'),
    adminAppendChildProduct = document.querySelector('.appendChildProduct'),
    // collection data
    editCollectionItem = document.querySelector('.editCollectionItem'),
    editNavItem = document.querySelector('.editNavItem'),
    editAddItem = document.querySelector('.editAddItem'),
    // edit data selection
    getProductID = document.querySelector('.getProductIDBTn'),
    getProductIDinput = document.querySelector('.getProductIDinput'),
    editzContainer = document.querySelector('.addOnINEditz'),
    editFileUploaderBtn = document.querySelector('.EditFileUploaderBtn'),
    adminEditFileUploader = document.querySelector('.adminEditFileUploader'),
    ///mainHomeBox
    allTakeIn = document.querySelector('.AllTakeIn'),
    // mainporductcontainer
    productgrid = document.querySelector('.product-grid'),
    //del selction
    delNavItem = document.querySelector('.delNavItems'),
    //profile btn
    btnActionUsernav = document.querySelector('.btnActionUsernav');

// data arrays
let cart = []
let userData = []
let state = {
    user: {},
    adminProduct: [],
    userCart: []
}

window.state = state
window.cart = cart

// localStorage setting

if (localStorage) {
    let storage = JSON.parse(localStorage.getItem('userData'))
    if (storage) {
        storage.map((el) => {
            userData.push(el)
        })
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
        state.user = currentUser
    }
    let adminProduct = JSON.parse(localStorage.getItem('productList'))
    if (adminProduct) {
        state.adminProduct.push(...adminProduct)
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
        state.userCart.push(...cart)
    }
}

// functions

function handleSignUP() {
    let email = document.querySelector('.SignUp-email').value
    let password = document.querySelector('.SignUp-password').value
    let user = document.querySelector('.SignUp-user').value
    let cart = []
    userData.push({
        userName: user,
        userEmail: email,
        userPassword: password,
        id: user + Math.random().toString(16),
        cart: cart
    })
    localStorage.setItem('userData', JSON.stringify(userData))
    document.querySelector('.SignUp-email').value = ''
    document.querySelector('.SignUp-user').value = ''
    document.querySelector('.SignUp-password').value = ''
    signInBtn.click()
}

function handleLoginIN() {
    console.log('wori')
    let email = document.querySelector('.loginIN-email').value
    let password = document.querySelector('.loginIN-password').value
    let localData = JSON.parse(localStorage.getItem('userData'))
    localData.map((el) => {
        if (el.userEmail === email && el.userPassword === password) {
            state.user = el
            localStorage.setItem('currentUser', JSON.stringify(state.user))
            state.userCart = []
            cart = []
            localStorage.setItem('cart', JSON.stringify(cart))
            let a = document.createElement('a')
            a.href = './html/home.html'
            a.click()
        }
    })
}

function renderAdmin() {
    let localData = JSON.parse(localStorage.getItem('userData'))
    adminAppendChildBox.innerHTML = ''
    localData.map((el) => {
        let markUp = `
<tr>
<td>
    <img alt="..." src="${el.image || el.userImage}" class="avatar avatar-sm rounded-circle me-2">
    <a class="text-heading font-semibold" href="#">
        ${el.userName}
    </a>
</td>
<td>
    <a class="text-heading font-semibold" href="#">
        ${el.userEmail}
    </a>
</td>
<td>
   ${el.userProfesstion}
</td>
<td>
   ${el.userPassword}
</td>
</tr>
`

        adminAppendChildBox.innerHTML += markUp
    })
}

function renderProductAdmin() {
    document.querySelector('.onColectionCotainer').style.display = 'block'
    document.querySelector('.editContainer').style.display = 'none'
    document.querySelector('.editAddContainer').style.display = 'none'
    document.querySelector('.delNavItemContainer').style.display = 'none'
    let produtdata = JSON.parse(localStorage.getItem('productList'))
    adminAppendChildProduct.innerHTML = ''
    if (produtdata) {
        produtdata.map((el) => {
            let markU = `
<tr>
<td>
    <img alt="..." src="${el.image}" class="avatar avatar-sm rounded-circle me-2">
</td>
<td>
${el.name}
</td>
<td>
${el.price}
</td>
<td>
${el.id}
</td>
<td>
   ${el.date ? `${el.date}` : 'Comming Soon!'}
</td>
</tr>`

            adminAppendChildProduct.innerHTML += markU
        })
    }
}

function renderEditz() {
    document.querySelector('.onColectionCotainer').style.display = 'none'
    document.querySelector('.editAddContainer').style.display = 'none'
    document.querySelector('.delNavItemContainer').style.display = 'none'
    document.querySelector('.editContainer').style.display = 'block'
}

function renderEditzProduct(el) {
    editzContainer.innerHTML = ''
    let markup = `
    <h2>Product Details</h2>
    <br>
    <div class="container mb-3">
<img src="${el.image}" class="img-thumbnail" alt="...">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <button type="button" class="btn btn-danger btn-sm" disabled><i class="bi bi-pencil"></i>
            Product Photo</button>
    </span>
</div>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-people"></i>
    </span>
</div>
<input type="text" class="form-control" placeholder="product Name"
    aria-label="Recipient's username" aria-describedby="button-addon2" disabled value='${el.name}'>
<button type="button" class="btn btn-danger btn-sm" disabled>Product Name</button>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-currency-dollar"></i>
    </span>
</div>
<input type="text" class="form-control" placeholder="product price"
    aria-label="Recipient's username" aria-describedby="button-addon2" disabled value='${el.price}'>
<button type="button" class="btn btn-danger btn-sm" disabled>Product Price</button>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-hash"></i>
    </span>
</div>
<input type="text" class="form-control" placeholder="product Id"
    aria-label="Recipient's username" aria-describedby="button-addon2" disabled value='${el.id}'>
<button type="button" class="btn btn-danger btn-sm" disabled>Product Id</button>
</div>`

    editzContainer.insertAdjacentHTML('afterbegin', markup)

}

function renderEditzDetailsProduct(el) {
    let markup = `
    <br /><br /><br />
    <h2>Edit Product Details</h2>
    <br>
    <div class="container mb-3">
<img src="${el.image}" class="img-thumbnail adminEditAppenderImg" alt="...">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <button type="button" class="EditFileUploaderBtn btn btn-danger btn-sm"><i class="bi bi-pencil"></i>
            Product Photo</button>
    </span>
    <input type="file" name="" style='visibility: hidden;' id="" class="adminEditFileUploader" />
</div>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-people"></i>
    </span>
</div>
<input type="text" class="newNameEditValue form-control" placeholder="Edit Name"
    aria-label="Recipient's username" aria-describedby="button-addon2" value='${el.name}'>
<button type="button" class="btn btn-danger btn-sm">Edit Name</button>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-currency-dollar"></i>
    </span>
</div>
<input type="text" class="newPriceEdit form-control" placeholder="Edit price"
    aria-label="Recipient's username" aria-describedby="button-addon2" value='${el.price}'>
<button type="button" class="btn btn-danger btn-sm">Edit Price</button>
</div>

<br /><br /><br />
<button type="button" class="btnSaveChanges btn btn-danger btn-sm">Save Changes</button>

`

    editzContainer.insertAdjacentHTML('beforeend', markup)
}

function renderAddOn() {
    document.querySelector('.onColectionCotainer').style.display = 'none'
    document.querySelector('.editContainer').style.display = 'none'
    document.querySelector('.editAddContainer').style.display = 'block'
    document.querySelector('.delNavItemContainer').style.display = 'none'
    document.querySelector('.editAddContainer').innerHTML = ''
    let markup = `
    <h3>Add Items</h3>
                        <div class="container mb-3">
                            <img src="../img/placeholer.png" style='width:500px; height:300px' class="imgAddNewItem img-thumbnail" alt="">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <button type="button" class="AddFileUploaderBtn btn btn-danger btn-sm"><i
                                            class="bi bi-pencil"></i>
                                        Product Photo</button>
                                </span>
                                <input type="file" name="" style='visibility: hidden;'
                                    class="adminAddFileUploader" />
                            </div>
                        </div>
                        <div class="container mb-3">
                        <p>Add hover photo</p>
                            <img src="../img/placeholer.png" style='width:500px; height:300px' class="imgAddHoverNewItem img-thumbnail" alt="">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <button type="button" class="imgAddHoverNewItemBtn btn btn-danger btn-sm"><i
                                            class="bi bi-pencil"></i>
                                        Product Photo</button>
                                </span>
                                <input type="file" name="" style='visibility: hidden;'
                                    class="imgAddHoverNewItemReal" />
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <i class="bi bi-bookmark-plus"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control addNewitemName" placeholder="Enter Product name"
                                aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button type="button" class="btn btn-danger btn-sm">Enter Name</button>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <i class="bi bi-coin"></i>
                                </span>
                            </div>
                            <input type="text" class="addNewitemPrice form-control" placeholder="Enter Product price"
                                aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button type="button" class="btn btn-danger btn-sm">Enter price</button>
                        </div>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">
                            <i class="bi bi-tag-fill"></i>
                            </span>
                          </div>
                         <input type="text" class="addNewitemDiscount form-control" placeholder="Enter Discount price"
                            aria-label="Recipient's username" aria-describedby="button-addon2">
                          <button type="button" class="btn btn-danger btn-sm">Enter price</button>
                       </div>
                       <div class="input-group mb-3">
                       <input type="checkbox" name="" class="checerSaleLAbel mx-5" id="" />
                       <p class='mx-1'><b>Add Sale Label</b></p>
                       </div>
                        <button type="button" class="AddProductIDBTn btn btn-danger btn-sm">Add New Item</button>
    `
    document.querySelector('.editAddContainer').insertAdjacentHTML('afterbegin', markup)
}

function renderDelMAchine() {
    document.querySelector('.onColectionCotainer').style.display = 'none'
    document.querySelector('.editAddContainer').style.display = 'none'
    document.querySelector('.editContainer').style.display = 'none'
    document.querySelector('.delNavItemContainer').style.display = 'block'
}

function makeNewnotificaltion(user) {
    let arr = []
    user.cart.map((el) => {
        arr.push(el.price)
    })
    window.arr = arr
    document.querySelector('.profile-dropDown').style.display = 'none'

    let markup = `
<div class="pCard_card neu">
                    <div class="pCard_up" style='background-image:url(${user.image || user.userImage});'>
                        <div class="pCard_text">
                            <h2>@${user.userName}</h2>
                            <p>${user.userProfesstion}</p>
                        </div>
                        <div class="pCard_add"><i class="fa fa-plus"></i></div>
                    </div>
                    <div class="pCard_down">
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                        <div>
                        <i class="fa-solid fa-id-card-clip fa-lg" style="color: #142d52;"></i>
                        <p>User Id</p>
                        <p style='font-size:17px;'>${user.id}</p>
                    </div>
                    </div>
                    <div class="pCard_back" style='overflow-y:scroll'>
                        <h3>My Cart </h3>
                            ${user.cart.map((el) => {
        return `<p font-size:13px;><b>${el.name}<br/>$${el.price}</b></p>`
    })}

        <p>Total:$${user.cart.lenght > 0 ? arr.reduce((el, num) => {
        return Number(el) + Number(num)
    }) : 'NOthing in cart'}</p>


    <button class='banner-btn' style='margin-left: 33%;'> <a href="./checkOut.html" style='color:#fff'>Check Out</a> </button>



  
                    </div>
                </div>
`


    document.querySelector('.NothingBut').innerHTML = markup
    document.querySelector('.btnActionUsernav').addEventListener('click', () => {
        console.log(user)
        if (document.querySelector('.pCard_card').classList.contains('fadeIN')) {
            document.querySelector('.pCard_card').classList.add('hidderAnimation')
            document.querySelector('.pCard_card').classList.remove('fadeIN')
            document.querySelector('.pCard_card').style.opacity = 0;
        } else if (document.querySelector('.pCard_card').classList.contains('neu')) {
            document.querySelector('.pCard_card').style.opacity = 1;
            document.querySelector('.pCard_card').classList.remove('hidderAnimation')
            document.querySelector('.pCard_card').classList.add('fadeIN')
        }
    })

}

function getTheCartBro(user) {
    if (user.cart) {
        user.cart.map((el) => {
            let markup =
                `<p>${el.name}</p>
            <p>${el.price}</p>
            `
            document.querySelector('.pCard_back').innerHTML += markup
        })
    }
}




if (signUpButton) {
    signUpButton.addEventListener('click', handleSignUP)
    loginInButton.addEventListener('click', handleLoginIN)
    signInBtn.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });
}


if (adminAppendChildBox) {
    renderAdmin()
    renderProductAdmin()

    editCollectionItem.addEventListener('click', () => {
        renderAdmin()
        renderProductAdmin()
    })

    editNavItem.addEventListener('click', () => {
        renderEditz()
    })

    editAddItem.addEventListener('click', () => {
        renderAddOn()

        document.querySelector('.AddFileUploaderBtn').addEventListener('click', () => {
            document.querySelector('.adminAddFileUploader').click()
            document.querySelector('.adminAddFileUploader').addEventListener('change', function () {
                const readerR = new FileReader()

                readerR.addEventListener('load', () => {
                    document.querySelector('.imgAddNewItem').setAttribute('src', readerR.result)
                })

                readerR.readAsDataURL(this.files[0])
            })
        })

        document.querySelector('.imgAddHoverNewItemBtn').addEventListener('click', () => {
            document.querySelector('.imgAddHoverNewItemReal').click()
            document.querySelector('.imgAddHoverNewItemReal').addEventListener('change', function () {
                const readerR = new FileReader()

                readerR.addEventListener('load', () => {
                    document.querySelector('.imgAddHoverNewItem').setAttribute('src', readerR.result)
                })

                readerR.readAsDataURL(this.files[0])
            })
        })
        document.querySelector('.AddProductIDBTn').addEventListener('click', () => {
            let img = document.querySelector('.imgAddNewItem').getAttribute('src')
            let hoverImage = document.querySelector('.imgAddHoverNewItem').getAttribute('src')
            let name = document.querySelector('.addNewitemName').value
            let price = document.querySelector('.addNewitemPrice').value
            let discount = document.querySelector('.addNewitemDiscount').value
            let sale = false;
            if (document.querySelector('.checerSaleLAbel').checked === true) {
                sale = true
            }
            let produtdata = JSON.parse(localStorage.getItem('productList'))
            if (!produtdata) {
                let ep = []
                localStorage.setItem('productList', JSON.stringify(ep))
                let produtdata = JSON.parse(localStorage.getItem('productList'))
                let newProductData = [...produtdata]
                newProductData.push({
                    name: name,
                    price: price,
                    image: img,
                    id: name + Math.random().toString(16),
                    date: new Date(),
                    discount: discount,
                    sale: sale,
                    hoverImage: hoverImage
                })
                localStorage.setItem('productList', JSON.stringify(newProductData))
                document.querySelector('.imgAddNewItem').setAttribute('src', '../img/placeholer.png')
                document.querySelector('.addNewitemName').value = ''
                document.querySelector('.addNewitemPrice').value = ''
            } else {
                let newProductData = [...produtdata]
                newProductData.push({
                    name: name,
                    price: price,
                    image: img,
                    id: name + Math.random().toString(16),
                    date: new Date(),
                    discount: discount,
                    sale: sale,
                    hoverImage: hoverImage
                })
                localStorage.setItem('productList', JSON.stringify(newProductData))
                document.querySelector('.imgAddNewItem').setAttribute('src', '../img/placeholer.png')
                document.querySelector('.addNewitemName').value = ''
                document.querySelector('.addNewitemPrice').value = ''
            }
        })
    })

    getProductID.addEventListener('click', () => {
        let id = getProductIDinput.value
        let product;
        if (id) {
            let produtdata = JSON.parse(localStorage.getItem('productList'))
            produtdata.map((el) => {
                if (el.id === id) {
                    product = el
                }
            })
            renderEditzProduct(product)
            renderEditzDetailsProduct(product)


            document.querySelector('.EditFileUploaderBtn').addEventListener('click', () => {
                document.querySelector('.adminEditFileUploader').click()
                document.querySelector('.adminEditFileUploader').addEventListener('change', function () {
                    const readerR = new FileReader()

                    readerR.addEventListener('load', () => {
                        document.querySelector('.adminEditAppenderImg').setAttribute('src', readerR.result)
                        console.log('done new again')
                        console.log(readerR.result)
                    })

                    readerR.readAsDataURL(this.files[0])
                })
            })

            document.querySelector('.btnSaveChanges').addEventListener('click', () => {
                let produtdata = JSON.parse(localStorage.getItem('productList'))
                let newImg = document.querySelector('.adminEditAppenderImg').getAttribute('src')
                let newName = document.querySelector('.newNameEditValue').value
                let newPrice = document.querySelector('.newPriceEdit').value

                function findId(useid) {
                    return useid.id === id
                }

                let index = produtdata.findIndex(findId)
                produtdata.splice(index, 1)
                let newProducts = []
                localStorage.setItem('productList', JSON.stringify(newProducts))
                newProducts = [...produtdata]
                newProducts.push({
                    name: newName,
                    price: newPrice,
                    id: id,
                    image: newImg
                })
                localStorage.setItem('productList', JSON.stringify(newProducts))
                let product = {
                    name: newName,
                    price: newPrice,
                    id: id,
                    image: newImg
                }
                renderEditzProduct(product)
                renderEditzDetailsProduct(product)
            })
        }

    })

    delNavItem.addEventListener('click', () => {
        renderDelMAchine()
        document.querySelector('.getDelBTn').addEventListener('click', () => {
            let id = document.querySelector('.getdelIDinput').value
            let produtdata = JSON.parse(localStorage.getItem('productList'))
            function findId(useid) {
                return useid.id === id
            }
            let index = produtdata.findIndex(findId)
            produtdata.splice(index, 1)
            let newProducts = []
            localStorage.setItem('productList', JSON.stringify(newProducts))
            newProducts = [...produtdata]
            localStorage.setItem('productList', JSON.stringify(newProducts))
            document.querySelector('.getdelIDinput').value = ''
            editCollectionItem.click()
        })
    })

}

if (allTakeIn) {

    document.querySelector('.header-user-actions').innerHTML = ` <button class="action-btn">
<ion-icon name="bag-handle-outline"></ion-icon>
<span class="count">0</span>
</button>
<button class="btnActionUsernav action-btn">
<ion-icon name="person-outline"></ion-icon>
</button>`


    let productdata = JSON.parse(localStorage.getItem('productList'))
    if (productdata) {
        productdata.map((el) => {
            if (el.sale && el.discount) {
                let markup = `
            <div class="showcase">

                                <div class="showcase-banner">
                                <div class="parent-showcaseBanner"><img style="objectFit: cover;" src="${el.image}"
                                alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img default" width="300"></div>
                                    <img src="${el.hoverImage ? `${el.hoverImage}` : `./assets/images/products/jacket-4.jpg`}" alt="Mens Winter Leathers Jackets"
                                        width="300" class="product-img hover">

                                    <p class="showcase-badge angle black">sale</p>
                                    <p class="showcase-badge" style="left: 160px;">${el.discount}%</p>

                                    <div class="showcase-actions">

                                      

                                        <button class="btn-action">
                                            <ion-icon name="eye-outline"></ion-icon>
                                        </button>

                                      

                                        <button class="cartAddbtn btn-action" id="${el.id}">
                                            <ion-icon name="bag-add-outline"></ion-icon>
                                        </button>

                                    </div>

                                </div>

                                <div class="showcase-content">

                                    <a href="#" class="showcase-category">jacket</a>

                                    <a href="#">
                                        <h3 class="showcase-title">${el.name}</h3>
                                    </a>

                                    <div class="showcase-rating">
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                    </div>

                                    <div class="price-box">
                                        <p class="price">$${el.price}</p>
                                        <del>$${Number(el.price + 400)}</del>
                                    </div>

                                
                                </div>

                            </div>
            `

                productgrid.innerHTML += markup
            }
            else if (el.discount && el.discount > 0) {
                let markup = `
            <div class="showcase">
        
            <div class="showcase-banner">
            <div class="parent-showcaseBanner"><img style="objectFit: cover;" src="${el.image}"
            alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img default" width="300"></div>
                <img src="${el.hoverImage ? `${el.hoverImage}` : `./assets/images/products/jacket-4.jpg`}" alt="Mens Winter Leathers Jackets"
                    width="300" class="product-img hover">
        
                <p class="showcase-badge">${el.discount} %</p>
        
                <div class="showcase-actions">
        
                 
        
                    <button class="btn-action">
                        <ion-icon name="eye-outline"></ion-icon>
                    </button>
        
                   
        
                    <button class="cartAddbtn btn-action" id="${el.id}">
                        <ion-icon name="bag-add-outline"></ion-icon>
                    </button>
        
                </div>
        
            </div>
        
            <div class="showcase-content">
        
                <a href="#" class="showcase-category">${el.name}</a>
        
                <a href="#">
                    <h3 class="showcase-title">${el.name}</h3>
                </a>
        
                <div class="showcase-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                </div>
        
                <div class="price-box">
                    <p class="price">$${el.price}</p>
                    <del>$${Number(el.price) + 200}</del>
                </div>
        
               
            </div>
        
        </div>
            `

                productgrid.innerHTML += markup
            }
            else {
                let markup = `
            <div class="showcase">

            <div class="showcase-banner">
            <div class="parent-showcaseBanner"><img style="objectFit: cover;" src="${el.image}"
                    alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img default" width="300"></div>
                
                <img style='' src="${el.hoverImage ? `${el.hoverImage}` : `./assets/images/products/jacket-4.jpg`}"
                    alt="MEN Yarn Fleece Full-Zip Jacket" class="product-img hover" width="300">

                <div class="showcase-actions">
                    

                    <button class="btn-action">
                        <ion-icon name="eye-outline"></ion-icon>
                    </button>

                    
                    <button class="cartAddbtn btn-action" id='${el.id}'>
                        <ion-icon name="bag-add-outline"></ion-icon>
                    </button>
                </div>
            </div>

            <div class="showcase-content">
                <a href="#" class="showcase-category">Jacket</a>

                <h3>
                    <a href="#" class="showcase-title">${el.name}</a>
                </h3>

                <div class="showcase-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                </div>

                <div class="price-box">
                    <p class="price">$${el.price}</p>
                    <del>$${Number(el.price + 200)}</del>
                </div> 
            </div>

        </div>

            `
                productgrid.innerHTML += markup
            }
        });
    }



    let idBTNCart = document.querySelectorAll('.cartAddbtn')
    idBTNCart = Array.from(idBTNCart)
    idBTNCart.forEach((el) => {
        el.addEventListener('click', () => {
            let id = el.id
            let userId = state.user.id
            let userData = JSON.parse(localStorage.getItem('userData'))
            let produtdata = JSON.parse(localStorage.getItem('productList'))
            let newUSer;

            produtdata.map((el) => {
                if (el.id === id) {
                    cart.push(el)
                    console.log('cdnv`')
                }
            })

            userData.map((el) => {
                if (el.id === userId) {
                    newUSer = el
                }
            })

            newUSer.cart = []
            newUSer.cart.push(...cart)
            console.log(newUSer)

            let newDataUSer = [...userData]
            function findId(useid) {
                return useid.id === userId
            }
            let index = newDataUSer.findIndex(findId)
            newDataUSer.findIndex(findId)
            newDataUSer.splice(index, 1)

            let faker = []
            localStorage.setItem('userData', JSON.stringify(faker))
            faker = [...newDataUSer]
            faker.push(newUSer)
            localStorage.setItem('userData', JSON.stringify(faker))
            makeNewnotificaltion(newUSer)
            console.log(newUSer)
            state.user = newUSer
            let no = {}
            localStorage.setItem('currentUser', JSON.stringify(no))
            no = newUSer
            localStorage.setItem('currentUser', JSON.stringify(no))
        })
    })

    btnActionUsernav.addEventListener('click', () => {
        console.log('i was cliked')
    })


    let notificationBox = document.querySelector('.profile-dropDown')
    notificationBox.innerHTML = `Welcome <b>${state.user.userName}</b>
    ${state.user.login ? `${makeNewnotificaltion(state.user)}` : `<button class='banner-btn' style='transition: none;'><a style='color: #fff;' href="./profileMAker.html">PLz Complete your Profile</a></button>`}  `
    document.querySelector('.btnActionUsernav').addEventListener('click', () => {
        notificationBox.classList.toggle('hidder')
    })

    if (document.querySelector('.pCard_add')) {
        document.querySelector('.pCard_add').addEventListener('click', () => {
            document.querySelector('.pCard_card').classList.toggle('pCard_on');
            let btn = document.querySelector('.pCard_add i')
            if (btn.classList.contains('fa-plus')) {
                btn.classList.remove('fa-plus')
                btn.classList.add('fa-minus')
            } else {
                btn.classList.remove('fa-minus')
                btn.classList.add('fa-plus')
            }
        })
    }

}


let completeBtn = document.querySelector('.CompleteBtnStooper')
if (completeBtn) {
    console.log(completeBtn)
    completeBtn.addEventListener('click', () => {
        let image = document.querySelector('.ProfileIMgUploader').getAttribute('src')
        let name = document.querySelector('.profileUSerName').value
        let email = document.querySelector('.profileEmailName').value
        let pro = document.querySelector('.professionKC').value
        let passowrd = document.querySelector('.PasswordPofileler').value
        let id = state.user.id
        let userData = JSON.parse(localStorage.getItem('userData'))
        let newUSer;

        userData.map((el) => {
            if (el.id === id) {
                newUSer = el
                console.log('yes', newUSer)
            }
        })



        newUSer.image = image
        newUSer.userName = name
        newUSer.userEmail = email
        newUSer.userPassword = passowrd
        newUSer.userProfesstion = pro
        newUSer.login = true


        let newUsersArr = [...userData]


        function findId(useid) {
            return useid.id === id
        }
        let index = newUsersArr.findIndex(findId)
        newUsersArr.splice(index, 1)

        newUsersArr.push({
            userName: name,
            userEmail: email,
            userPassword: passowrd,
            id: id,
            userProfesstion: pro,
            userImage: image,
            cart: [...newUSer.cart],
            login: true
        })

        let newFAkeArr = []
        localStorage.setItem('userData', JSON.stringify(newFAkeArr))
        newFAkeArr = [...newUsersArr]
        localStorage.setItem('userData', JSON.stringify(newFAkeArr))

        state.user = newUSer
        let no = {}
        localStorage.setItem('currentUser', JSON.stringify(no))
        no = newUSer
        localStorage.setItem('currentUser', JSON.stringify(no))
        console.log(JSON.parse(localStorage.getItem('currentUser')))
    })
}






