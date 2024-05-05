//reponsive
const site_bar = document.querySelectorAll('.site-bar nav > div')
const nav_bar = document.querySelector('.nav-signin')

const checkScreen = () => {
    if (window.innerWidth <= 1200) {
        site_bar[1].classList.add('dropdown');
        site_bar[1].querySelector('p').classList.remove('hidden');
        site_bar[1].querySelector('div').classList.add('dropdown-content');
    } else {
        site_bar[1].classList.remove('.dropdown');
        site_bar[1].querySelector('p').classList.add('hidden');
        site_bar[1].querySelector('div').classList.remove('dropdown-content');
    }
    if (window.innerWidth <= 700) {
        nav_bar.classList.add('dropdown');
        nav_bar.querySelector('p').classList.remove('hidden');
        nav_bar.querySelector('nav').classList.add('dropdown-content');
    } else {
        nav_bar.classList.remove('dropdown');
        nav_bar.querySelector('p').classList.add('hidden');
        nav_bar.querySelector('nav').classList.remove('dropdown-content');
    }

}
window.addEventListener('resize', () => { checkScreen() })
//Search Box

const search_btn = document.querySelector('.search img');
const search_box = document.querySelector('.search input');
search_btn.addEventListener("click", () => {

    if (search_box.classList.contains('hidden')) {
        search_box.classList.remove('hidden');
    } else {
        if (search_box.value === '') alert('Bạn chưa nhập gì');
        else {
            let search_content = search_box.value;
            localStorage.setItem('search-content', search_content);
            window.location.assign("news-web/news-search/search.html");
        }
    }

});

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
        cards.scrollLeft = 1428 <= cards.scrollLeft ? 0 : cards.scrollLeft + firstCardWidth
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
const UserData_login = document.querySelectorAll('.login-form .data input');
const UserData_signup = document.querySelectorAll('.signup-form .data input');
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
        UserData_login.forEach((item) => {
            item.value = '';
        })
        UserData_signup.forEach((item) => {
            item.value = '';
        })
        forgot_form_data.forEach((item) => {
            item.value = '';
        })
        recoverPass_form_data.forEach((item) => {
            item.data = '';
        })
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


const Submit_btn = document.querySelectorAll('.signup-login-form .submit input[type=submit]');
const errorMess = document.querySelectorAll('.signup-login-form form .data span')
const popup_myacc_data = document.querySelectorAll('.popup-myacc form .data input');
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
                    let UserNow = {
                        UserOn: true,
                        UserName: user.UserName
                    }
                    localStorage.setItem('UserNow', JSON.stringify(UserNow));
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
    localStorage.setItem('UserNow', JSON.stringify({ UserOn: false, UserName: '' }));
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
Submit_btn.forEach((btn, index) => btn.addEventListener('click', (e) => {
    e.preventDefault();
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
                "Password": UserData_signup[4].value,
                "LikeNews": []
            }
            UserData_signup.forEach((item) => {
                item.value = '';
                item.classList.remove('sucess');
                item.classList.remove('error');
            })
            let localStorageData = localStorage.getItem('dataUser');
            let localStorageDataArray = JSON.parse(localStorageData);
            localStorageDataArray = localStorageData === null ? [] : localStorageDataArray;
            localStorageDataArray = [...localStorageDataArray, newUser];
            localStorage.setItem('dataUser', JSON.stringify(localStorageDataArray));
            alert("Tạo tài khoản thành công")
            signup_form.classList.add('hidden');
            blur.classList.add('hidden');
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

forgot_form.querySelector('.submit input').addEventListener('click', (e) => {
    e.preventDefault();
    let data = [];
    forgot_form_data.forEach((element, index) => {
        data[index] = element.value;
    });
    let check = check_data_forgot_form(data[0], data[1], data[2], data[3]) ? true : false;
    if (check) {
        recover_User = data[0];
        forgot_form.classList.add('hidden');
        recoverPass_form.classList.remove('hidden');
        forgot_form_data.forEach((element) => {
            element.value = '';
        });
        login_form.classList.add('hidden');
        recoverPass_form_data.forEach((form, index) => {
            if (index === 0) {
                form.addEventListener('input', () => {
                    if (!checkPassword(recoverPass_form_data[index].value)) {
                        recoverPass_form_data[index].classList.add('error');
                        recoverPass_form_data[index].classList.remove('sucess');
                        errorMess[6].innerHTML = 'Mật khẩu phải chứa chữ thường ,in hoa và số'
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
recoverPass_form.querySelector('.submit input').addEventListener('click', (e) => {
    e.preventDefault();
    if (checkp && checkcp) {
        let dataUser = localStorage.getItem('dataUser');
        let dataUserArray = JSON.parse(dataUser);
        dataUserArray.forEach(element => {
            if (element.UserName === recover_User) {
                element.Password = recoverPass_form_data[0].value;
            }
        });
        recoverPass_form_data[0].value = '';
        recoverPass_form_data[1].value = '';
        localStorage.setItem('dataUser', JSON.stringify(dataUserArray));
        alert("Cập nhật mật khẩu thành công");
        recoverPass_form.classList.add('hidden');
        blur.classList.add('hidden');
    } else {
        alert("Không hợp lệ, vui lòng kiểm tra lại");
    }
})
//Kiem tra nguoi dung co dang nhap truoc do chua
window.addEventListener('load', () => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    if ((UserNow?.UserOn !== null && UserNow?.UserOn !== undefined) && UserNow.UserOn) {

        let dataUser = localStorage.getItem('dataUser');
        let userDataArray = JSON.parse(dataUser);
        userDataArray.forEach((user) => {
            if (user.UserName.trim() === UserNow.UserName) {
                popup_myacc_data[0].value = user.UserName;
                popup_myacc_data[1].value = user.Email;
                popup_myacc_data[2].value = user.Name;
                popup_myacc_data[3].value = user.BirthDay;

                login_form.classList.add('hidden');
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

            }
        })

    } else {
        popup_myacc_data[0].value = '';
        popup_myacc_data[1].value = '';
        popup_myacc_data[2].value = '';
        popup_myacc_data[3].value = '';
        login_btn[0].classList.remove('hidden');
        signup_btn[0].classList.remove('hidden');
        logout_btn.classList.add('hidden');
        myacc_btn.classList.add('hidden');
        localStorage.setItem('UserNow', JSON.stringify({ UserOn: false, UserName: '' }));
    }
})
//Like news
let News = [
    {
        ID: "ID0001",
        Name: "AI - trò chơi 'đốt tiền hoặc bị đào thải'",
        Topic: "Công Nghệ",
        Summary: "Khi cơn sốt AI tăng cao, các ông lớn chi hàng tỷ USD để xây dựng các mô hình ngôn ngữ, còn công ty nhỏ phải thu hẹp quy mô.",
        SrcImg: "../../images/Alsmartphone.jpg",
        SrcNews: "../news/Altrochoidottien.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0002",
        Name: "Ánh sáng bí ẩn dẫn đường cho thủy thủ trên biển",
        Topic: "Kì lạ",
        Summary: "Giới nghiên cứu vẫn chưa tìm ra cách giải thích về hiện tượng phát sáng kỳ lạ trên đại dương có thể giúp thủy thủ định hướng cách đây hàng nghìn năm.",
        SrcImg: "../../images/theboat.jpg",
        SrcNews: "../news/Anhsangbian.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0003",
        Name: "Bí ẩn vệt sáng đỏ xuất hiện trên trời 1.400 năm trước",
        Topic: "Kì Lạ",
        Summary: "Các nhà khoa học cho rằng vệt sáng giống đuôi gà lôi xuất hiện năm 620 là cực quang chịu ảnh hưởng của một cơn bão từ mạnh.",
        SrcImg: "../../images/redsky.jpg",
        SrcNews: "../news/Bianvetsangdo.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0004",
        Name: "Cha đẻ của khẩu súng máy đầu tiên trên thế giới",
        Topic: "Lịch Sử",
        Summary: "Súng Puckle ra đời vào năm 1718 có thể bắn 9 phát liên tục nhưng không thành công về mặt thương mại do vấn đề kíp nổ",
        SrcImg: "../../images/Sung.jpg",
        SrcNews: "../news/Chadecuakhausung.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0005",
        Name: "Gần 140 nhà khoa học chia sẻ nghiên cứu về vật lý",
        Topic: "Vật Lí",
        Summary: "Các nhà khoa học Việt Nam và quốc tế giới thiệu 114 nghiên cứu mới về công nghệ quang học, địa chất, thiên văn… tại Hội nghị vật lý, vật lý kỹ thuật lần 8.",
        SrcImg: "../../images/themanwatching.jpg",
        SrcNews: "../news/gan140nhakhoahoc.html",
        By: "Nguyen De"
    },

    {
        ID: "ID0006",
        Name: "Giảm nhiệt cho smartphone khi dùng ngoài trời nắng nóng",
        Topic: "Công Nghệ",
        Summary: "Smartphone thường bị quá nhiệt khi ở ngoài trời nắng, người dùng nên hạn chế kết nối tốc độ cao hay camera để giảm nhiệt.",
        SrcImg: "../../images/smartphone_high.jpg",
        SrcNews: "../news/giamnhietsmartphone.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0007",
        Name: "Lần đầu quan sát 'cầu vồng' ở ngoại hành tinh",
        Topic: "Vũ Trụ",
        Summary: "Kính viễn vọng không gian CHEOPS phát hiện những vòng tròn ánh sáng đồng tâm với màu cầu vồng ở WASP-76b, ngoại hành tinh có mưa sắt.",
        SrcImg: "../../images/HanhTinh.jpg",
        SrcNews: "../news/Landauquansat.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0008",
        Name: "Lý giải hiện tượng cực quang dưới góc nhìn Vật lý phổ thông",
        Topic: "Vật Lí",
        Summary: "Bằng cách áp dụng các kiến thức Vật lý khối THPT, học sinh có thể lý giải hiện tượng cực quang và quá trình hình thành.",
        SrcImg: "../../images/beutifulsky.jpg",
        SrcNews: "../news/Lygiaihientuongcucquang.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0009",
        Name: "NASA tìm ra lỗi trục trặc trên tàu vũ trụ cách 24 tỷ km",
        Topic: "Vũ Trụ",
        Summary: "Tàu Voyager 1 truyền dữ liệu vô nghĩa từ cuối tháng 11 năm ngoái do một con chip trên tàu có thể bị hạt năng lượng cao va trúng.",
        SrcImg: "../../images/NASA.jpg",
        SrcNews: "../news/Nasatimraloitructrac.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0010",
        Name: "Nhà khoa học thảo luận về phân cực bụi vũ trụ'",
        Topic: "Vật Lí",
        Summary: "Các nhà khoa học đến từ 12 quốc gia và vùng lãnh thổ cùng trao đổi về các xu hướng nghiên cứu mới tại hội thảo 'Vật lý thiên văn SAGI lần thứ 2 về phân cực bụi' diễn ra trong 5 ngày.",
        SrcImg: "../../images/themanmicro.jpg",
        SrcNews: "../news/nhakhoahochaoluan.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0011",
        Name: "Nhiều người bị khóa Apple ID",
        Topic: "Công Nghệ",
        Summary: "Nhiều người dùng thiết bị Apple cho biết bất ngờ bị khóa tài khoản và yêu cầu đặt lại mật khẩu Apple ID.",
        SrcImg: "../../images/KhoaIDapple.jpg",
        SrcNews: "../news/Nhieunguoibikhoaid.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0012",
        Name: "Tại sao Biển Chết siêu mặn?",
        Topic: "Trái Đất",
        Summary: "Biển Chết có độ mặn cao gấp gần 10 lần đại dương do nước bay hơi để lại muối tích tụ trong nước và lắng đọng dưới đáy hồ.",
        SrcImg: "../../images/BienChet.jpg",
        SrcNews: "../news/Taisaobienchetsieuman.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0013",
        Name: "Tại sao xe điện mặt trời không xuất hiện trên đường?",
        Topic: "Đời Sống",
        Summary: "Những trở ngại trong việc sản xuất điện tại chỗ và giá thành lắp đặt khiến xe điện mặt trời rất khó phổ biến ở hiện tại.",
        SrcImg: "../../images/Xe-dien.jpg",
        SrcNews: "../news/taisaoxedien.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0014",
        Name: "Thử nghiệm tăng sáng mây giúp Trái Đất nguội đi",
        Topic: "Trái Đất",
        Summary: "Nhóm chuyên gia tại Đại học Washington dùng máy phun chuyên dụng phun hạt muối biển siêu nhỏ lên mây trên biển, giúp chuyển hướng ánh sáng Mặt Trời.",
        SrcImg: "../../images/ThuNghiemTangSang.jpg",
        SrcNews: "../news/Thunghiemtangsang.html",
        By: "Nguyen De"
    },
    {
        ID: "ID0015",
        Name: "'Vòng xoáy đêm' phát sáng trên bầu trời Hawaii",
        Topic: "Kì Lạ",
        Summary: "Sau khi hoàn thành nhiệm vụ phóng vệ tinh, tên lửa Falcon 9 của SpaceX gây ra hiện tượng kỳ lạ trên bầu trời đêm hôm 17/4.",
        SrcImg: "../../images/sky.jpg",
        SrcNews: "../news/Vongxoaydem.html",
        By: "Nguyen De"
    }
]

window.addEventListener('load', () => {
    localStorage.setItem('News', JSON.stringify(News));
    checkScreen();
    let user = [{
        "UserName": 'Admin',
        "Email": 'Admin@gmail.com',
        "Name": 'Admin',
        "BirthDay": '2000-01-01',
        "Password": 'Admin123',
        "LikeNews": []
    }]
    if (!UserNamecheck('Admin')) {
        localStorage.setItem('dataUser', JSON.stringify(user));
    }
})
const like_news_btn = document.querySelector('.like-news-btn');
like_news_btn.addEventListener('click', (e) => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    if (!UserNow.UserOn) {
        e.preventDefault();
        alert('Vui lòng đăng nhập để xem bài báo yêu thích của tài khoản')
    }
})

