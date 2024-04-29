//Search Box
const searchHidden = () => {
    search[0].firstElementChild.classList.contains("hidden") ? search[0].firstElementChild.classList.remove("hidden") : search[0].firstElementChild.classList.add("hidden");
}
const search = document.getElementsByClassName('search')

search[0].lastElementChild.addEventListener("click", () => { searchHidden() });

//Trend news

const cards = document.querySelector('.news-cards');
const arrowBtns = document.querySelectorAll(".section-trendnews div>img")
const firstCardWidth = cards.querySelector("article").offsetWidth; //lay width cua article
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        cards.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
    })
})
let isDragging = false, startX, startScrollLeft;
const draggingStart = (e) => {
    isDragging = true;
    cards.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = cards.scrollLeft;
}
const draggingStop = () => {
    isDragging = false;
    cards.classList.remove('dragging');

}
const dragging = (e) => {
    if (!isDragging) return; // Khong lam gi ca
    cards.scrollLeft = startScrollLeft - (e.pageX - startX)
}
const autoplay = () => {
    setInterval(() => {
        cards.scrollLeft = cards.offsetWidth <= cards.scrollLeft ? 0 : cards.scrollLeft + firstCardWidth
        // console.log(cards.scrollLeft)
    }, 5000);
}
autoplay();
cards.addEventListener("mousemove", dragging);
cards.addEventListener("mousedown", draggingStart);
cards.addEventListener("mouseup", draggingStop);

//Hiệu ứng pop-up form

const login_btn = document.querySelectorAll('.login-btn');
const signup_btn = document.querySelectorAll('.signup-btn');
const login_form = document.querySelector('.login-form');
const signup_form = document.querySelector('.signup-form');
const sucess_popup = document.querySelector('.sucess-popup');
const close_btn = document.querySelectorAll('.signup-login-form .close-btn')
const blur = document.querySelector('.blur')
const myacc_btn = document.querySelector('.myacc-btn');
const myacc_form = document.querySelector('.popup-myacc')
const logout_btn = document.querySelector('.logout-btn');
const forgot_btn = document.querySelector('.login-form .forgot-pass-btn');
const forgot_form = document.querySelector('.forgot-pass');
const forgot_form_data = document.querySelectorAll('.forgot-pass .data input')
const recoverPass_form = document.querySelector('.recoverPass-form');
const recoverPass_form_data = document.querySelectorAll('.recoverPass-form .data input');
login_btn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        login_form.classList.remove('hidden');
        blur.classList.remove('hidden');
        index && signup_form.classList.add('hidden');
    })
})
signup_btn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        signup_form.classList.remove('hidden');
        blur.classList.remove('hidden');
        index && login_form.classList.add('hidden');

    })
})

close_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        login_form.classList.add('hidden');
        signup_form.classList.add('hidden');
        sucess_popup.classList.add('hidden');
        myacc_form.classList.add('hidden');
        forgot_form.classList.add('hidden');
        recoverPass_form.classList.add('hidden');
        blur.classList.add('hidden');
    })

})
//Kiem tra sau khi dang nhap
myacc_btn.addEventListener('click', () => {
    myacc_form.classList.remove('hidden')
    blur.classList.remove('hidden')
});
//Forgot pass
forgot_btn.addEventListener('click', () => {
    forgot_form.classList.remove('hidden');
})
//User data
const UserData_login = document.querySelectorAll('.login-form .data input');
const UserData_signup = document.querySelectorAll('.signup-form .data input');

const Submit_btn = document.querySelectorAll('.signup-login-form .submit input[type=submit]');
const errorMess = document.querySelectorAll('.signup-login-form form .data span')
const popup_myacc_data = document.querySelectorAll('.popup-myacc form .data input')
let checkun = false, checke = false, checkn = false, checkbd = false, checkp = false, checkcp = false;
let recover_User = '';
const UserNamecheck = (username) => {
    let dataUser = localStorage.getItem('dataUser');
    if (dataUser === undefined || dataUser === null) return false;
    let userDataArray = JSON.parse(dataUser);
    let find = false;
    userDataArray.forEach((user) => {
        if (user.UserName === username) find = true;
    })
    return find;
}
UserData_login.forEach((user) => user.addEventListener('blur', () => user.classList.remove('error')));
const LoginCheck = (username, pass) => {
    let check = false;
    if (UserNamecheck(username)) {
        let dataUser = localStorage.getItem('dataUser');
        let userDataArray = JSON.parse(dataUser);
        userDataArray.forEach((user) => {
            if (user.UserName.trim() === username) {
                if (user.Password === pass) check = true;
                else check = false;
                if (check) {
                    popup_myacc_data[0].value = user.UserName;
                    popup_myacc_data[1].value = user.Email;
                    popup_myacc_data[2].value = user.Name;
                    popup_myacc_data[3].value = user.BirthDay;
                }
            }
        })
    }
    return check;
}
//Log out
logout_btn.addEventListener('click', () => {
    popup_myacc_data[0].value = '';
    popup_myacc_data[1].value = '';
    popup_myacc_data[2].value = '';
    popup_myacc_data[3].value = '';
    login_btn[0].classList.remove('hidden');
    signup_btn[0].classList.remove('hidden');
    logout_btn.classList.add('hidden');
    myacc_btn.classList.add('hidden');
})
//Xử lí Đăng kí người dùng
const checkUserName = (username) => {
    if (username === '' || username === null || username === undefined) return false;
    else return true;
}
const checkEmail = (email) => {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
const checkPassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    return true;
}
const checkName = (name) => {
    return name.length > 0;
}
const checkDate = (Birthday) => {
    if (Birthday === '') return false;
    let d = new Date();
    let bd = new Date(Birthday);
    if (bd > d) return false;
    else return true;
}
Submit_btn.forEach((btn, index) => btn.addEventListener('click', () => {
    if (index === 0) {
        let username = UserData_login[0].value;
        let pass = UserData_login[1].value;
        if (LoginCheck(username, pass)) {
            login_form.classList.add('hidden');
            sucess_popup.classList.remove('hidden');
            login_btn[0].classList.add('hidden');
            signup_btn[0].classList.add('hidden');
            logout_btn.classList.remove('hidden');
            myacc_btn.classList.remove('hidden');
            UserData_login.forEach((item) => {
                item.value = '';
            })
            blur.classList.add('hidden')
            setTimeout(() => {
                sucess_popup.classList.add('hidden')
            }, 7000);
        } else {
            alert("Kiểm tra lại UserName hoặc password");
            UserData_login.forEach((user) => user.classList.add('error'));
        }
    } else if (index === 1) {
        if (checkn && checkun && checkp && checkcp && checkbd && checke) {
            let newUser = {
                "UserName": UserData_signup[0].value,
                "Email": UserData_signup[1].value,
                "Name": UserData_signup[2].value,
                "BirthDay": UserData_signup[3].value,
                "Password": UserData_signup[4].value
            }
            UserData_signup.forEach((item) => {
                item.value = '';
            })
            let localStorageData = localStorage.getItem('dataUser');
            let localStorageDataArray = JSON.parse(localStorageData);
            localStorageDataArray = localStorageData === null ? [] : localStorageDataArray;
            localStorageDataArray = [...localStorageDataArray, newUser];
            localStorage.setItem('dataUser', JSON.stringify(localStorageDataArray));
            alert("Tạo tài khoản thành công")
        } else {
            alert("Kiểm tra lại thông tin")
        }
    }

}))

UserData_signup.forEach((data, index) => {

    switch (index) {
        case 0:
            data.addEventListener('input', () => {
                if (!checkUserName(UserData_signup[index].value) ||
                    UserNamecheck(UserData_signup[index].value)) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[0].innerHTML = 'UserName không hợp lệ hoặc đã tồn tại'
                    checkun = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[0].innerHTML = '';
                    checkun = true;
                }
            })
            break;
        case 1:
            data.addEventListener('input', () => {
                if (!checkEmail(UserData_signup[index].value)) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[index].innerHTML = 'Email không hợp lệ'
                    checke = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[index].innerHTML = '';
                    checke = true;
                }
            })
            break;
        case 2:
            data.addEventListener('input', () => {
                if (!checkName(UserData_signup[index].value)) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[index].innerHTML = 'Không được để trống tên'
                    checkn = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[index].innerHTML = '';
                    checkn = true;
                }
            })
            break;
        case 3:
            data.addEventListener('input', () => {
                if (!checkDate(UserData_signup[index].value)) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[index].innerHTML = 'Ngày không hợp lệ'
                    checkbd = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[index].innerHTML = '';
                    checkbd = true;
                }
            })
            break;
        case 4:
            data.addEventListener('input', () => {
                if (!checkPassword(UserData_signup[index].value)) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[index].innerHTML = 'Mật khẩu phải đủ 8 kí tự và có chữ thường và hoa'
                    checkp = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[index].innerHTML = '';
                    checkp = true;
                }
            })
            break;
        case 5:
            data.addEventListener('input', () => {
                if (UserData_signup[index].value !== UserData_signup[index - 1].value) {
                    UserData_signup[index].classList.add('error');
                    UserData_signup[index].classList.remove('sucess');
                    errorMess[index].innerHTML = 'Chưa trùng với password'
                    checkcp = false;
                } else {
                    UserData_signup[index].classList.remove('error');
                    UserData_signup[index].classList.add('sucess');
                    errorMess[index].innerHTML = '';
                    checkcp = true;
                }
            })
            break;
        default:
            console.log('error');
            break;
    }
})
//Xử lí quên password
const check_data_forgot_form = (User, Email, Name, BirthDay) => {
    let dataUser = localStorage.getItem('dataUser');
    let userDataArray = JSON.parse(dataUser);
    let check = false;
    userDataArray.forEach((user) => {
        if (user.UserName.trim() === User) {
            if (user.Email === Email && user.Name === Name && user.BirthDay.toString() === BirthDay.toString()) check = true;

        }
    }
    )
    return check;
}

forgot_form.querySelector('.submit input').addEventListener('click', () => {
    let data = [];
    forgot_form_data.forEach((element, index) => {
        data[index] = element.value;
    });
    let check = check_data_forgot_form(data[0], data[1], data[2], data[3]) ? true : false;
    if (check) {
        recover_User = data[0];
        forgot_form.classList.add('hidden');
        recoverPass_form.classList.remove('hidden');
        login_form.classList.add('hidden');
        recoverPass_form_data.forEach((form, index) => {
            if (index === 0) {
                form.addEventListener('input', () => {
                    if (!checkPassword(recoverPass_form_data[index].value)) {
                        recoverPass_form_data[index].classList.add('error');
                        recoverPass_form_data[index].classList.remove('sucess');
                        errorMess[6].innerHTML = 'Mật khẩu không hợp lệ'
                        checkp = false;
                    } else {
                        recoverPass_form_data[index].classList.add('sucess');
                        recoverPass_form_data[index].classList.remove('error');
                        errorMess[6].innerHTML = '';
                        checkp = true;
                    }
                })
            } else {
                form.addEventListener('input', () => {
                    if (recoverPass_form_data[index].value !== recoverPass_form_data[index - 1].value) {
                        recoverPass_form_data[index].classList.add('error');
                        recoverPass_form_data[index].classList.remove('sucess');
                        errorMess[7].innerHTML = 'Mật khẩu không trùng'
                        checkcp = false;
                    } else {
                        recoverPass_form_data[index].classList.add('sucess');
                        recoverPass_form_data[index].classList.remove('error');
                        errorMess[7].innerHTML = '';
                        checkcp = true;
                    }
                })
            }
        })


    }
    else alert("Thông tin không hợp lệ")
}
)
recoverPass_form.querySelector('.submit input').addEventListener('click', () => {
    if (checkp && checkcp) {
        let dataUser = localStorage.getItem('dataUser');
        let dataUserArray = JSON.parse(dataUser);
        dataUserArray.forEach(element => {
            if (element.UserName === recover_User) {
                element.Password = recoverPass_form_data[0].value;
            }
        });
        localStorage.setItem('dataUser', JSON.stringify(dataUserArray));
        alert("Cập nhật mật khẩu thành công");
        recoverPass_form.classList.add('hidden');
        blur.classList.add('hidden');
    } else {
        alert("Không hợp lệ, vui lòng kiểm tra lại");
    }
})




