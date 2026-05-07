 let isSignup = false;
    let userData = {};
    let currentRestaurant = "";
    let cart = [];
    let qty = {};
    let orderPlaced = false;
    // --- AUTH LOGIC ---
    function toggleMode() {
        isSignup = !isSignup;
        document.getElementById("formTitle").innerText = isSignup ? "Sign Up for Foodify" : "Login to Foodify";
        document.getElementById("toggleText").innerText = isSignup ? "Already have an account? Login" : "Don't have an account? Sign up";
        document.getElementById("signupFields").style.display = isSignup ? "block" : "none";
    }
    function handleAuth() {
        let user = document.getElementById("username").value;
        if (!user) { alert("Please enter a username"); return; }
        
        if (isSignup) {
            userData = {
                name: user,
                age: document.getElementById("age").value || "N/A",
                email: document.getElementById("email").value || "N/A",
                location: document.getElementById("location").value || "N/A",
                mobile: document.getElementById("mobile").value || "N/A"
            };
        } else {
            userData = { name: user, age: "25", email: user + "@example.com", location: "Default City", mobile: "9876543210" };
        }
        document.getElementById("pName").innerText = userData.name;
        document.getElementById("pAge").innerText = userData.age;
        document.getElementById("pEmail").innerText = userData.email;
        document.getElementById("pLocation").innerText = userData.location;
        document.getElementById("pMobile").innerText = userData.mobile;
        document.getElementById("login").classList.remove("active");
        document.getElementById("navbar").style.display = "flex";
        show('home');
    }
    function logout() { location.reload(); }
    // --- NAVIGATION ---
    function show(id) {
        if (id === 'track' && cart.length === 0 && !orderPlaced) {
            alert("Your cart is empty! Add items to enable tracking.");
            id = 'cart'; 
        }
        document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        
        if(id === "restaurants") renderRestaurants();
        if(id === "cart") renderCart();
    }
    // --- DATA ---
    const restaurants = [
        { name: "Burger King", desc: "Classic Flame-Grilled Burgers", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800" },
        { name: "Pizza Hut", desc: "Fresh & Cheesy Pizzas", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800" },
        { name: "Tandoori House", desc: "Authentic Indian Flavors", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800" },
        { name: "Biryani Hub", desc: "The Best Dum Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=800" }
    ];
    const menus = {
        "Burger King": [
            { name: "Whopper", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500" },
            { name: "Cheeseburger", price: 120, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500" },
            { name: "Crispy Chicken", price: 150, img: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=500" },
            { name: "Onion Rings", price: 90, img: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500" }
        ],
        "Pizza Hut": [
            { name: "Margherita", price: 299, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=500" },
            { name: "Pepperoni", price: 399, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500" },
            { name: "Veggie Supreme", price: 350, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=500" },
            { name: "Garlic Breadsticks", price: 120, img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500" }
        ],
        "Tandoori House": [
            { name: "Paneer Tikka", price: 220, img: "https://images.unsplash.com/photo-1567184109411-e2f8eac49774?auto=format&fit=crop&w=500" },
            { name: "Chicken Tandoori", price: 350, img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500" },
            { name: "Butter Naan", price: 40, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500" },
            { name: "Dal Makhani", price: 180, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500" }
        ],
        "Biryani Hub": [
            { name: "Hyderabadi Biryani", price: 320, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500" },
            { name: "Lucknowi Biryani", price: 300, img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500" },
            { name: "Egg Biryani", price: 250, img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=500" },
            { name: "Chicken 65", price: 190, img: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=500" }
        ]
    };
    // --- RENDER FUNCTIONS ---
    function renderRestaurants() {
        let g = document.getElementById("restaurantGrid");
        g.innerHTML = "";
        restaurants.forEach(r => {
            let d = document.createElement("div");
            d.className = "card";
            d.innerHTML = `<img src="${r.img}"><h3>${r.name}</h3><p>${r.desc}</p><button>View Menu</button>`;
            d.onclick = () => {
                currentRestaurant = r.name;
                document.getElementById("menuTitle").innerText = r.name + " Menu";
                renderMenu();
                show("menu");
            };
            g.appendChild(d);
        });
    }
    function renderMenu() {
        let g = document.getElementById("menuGrid");
        g.innerHTML = "";
        let items = menus[currentRestaurant] || [];
        items.forEach(i => {
            let count = qty[i.name] || 0;
            let d = document.createElement("div");
            d.className = "card";
            d.innerHTML = `
                <img src="${i.img}">
                <h3>${i.name}</h3>
                <p>₹${i.price}</p>
                <div class="qty">
                    <button onclick="event.stopPropagation(); remove('${i.name}')">-</button>
                    <span class="qty-badge">${count}</span>
                    <button onclick="event.stopPropagation(); add('${i.name}',${i.price})">+</button>
                </div>`;
            g.appendChild(d);
        });
    }
    function add(name, price) {
        qty[name] = (qty[name] || 0) + 1;
        let item = cart.find(x => x.name === name);
        if (item) item.qty++;
        else cart.push({ name, price, qty: 1 });
        updateGlobalState();
        renderMenu();
    }
    function remove(name) {
        if (!qty[name] || qty[name] <= 0) return;
        qty[name]--;
        let item = cart.find(x => x.name === name);
        if (item) {
            item.qty--;
            if (item.qty === 0) cart = cart.filter(x => x.name !== name);
        }
        updateGlobalState();
        renderMenu();
    }
    function updateGlobalState() {
        let totalItems = cart.reduce((a, b) => a + b.qty, 0);
        document.getElementById("count").innerText = totalItems;
    }
    function renderCart() {
        let container = document.getElementById("cartContent");
        let emptyMsg = document.getElementById("emptyCartMsg");
        let d = document.getElementById("cartItems");
        let payArea = document.getElementById("paymentArea");
        
        if (cart.length === 0) {
            container.style.display = "none";
            emptyMsg.style.display = "block";
            return;
        }
        container.style.display = "block";
        emptyMsg.style.display = "none";
        d.innerHTML = "";
        let total = 0;
        cart.forEach(i => {
            total += i.price * i.qty;
            d.innerHTML += `<div class="card" style="margin-bottom:10px; display:flex; justify-content:space-between;">
                <span>${i.name} x${i.qty}</span> <span>₹${i.price * i.qty}</span>
            </div>`;
        });
        document.getElementById("total").innerText = "Total: ₹" + total;
        payArea.style.display = "block";
    }
    function toggleQR() {
        let method = document.getElementById("payMethod").value;
        document.getElementById("qr-container").style.display = (method === "Online") ? "inline-block" : "none";
    }
    // --- ORDER TRACKING ---
    function placeOrder() {
        orderPlaced = true;
        show('track');
        
        let status = document.getElementById("status");
        let bar = document.getElementById("progressBar");
        let msg = document.getElementById("trackMsg");
        
        document.getElementById("progressContainer").style.display = "block";
        document.getElementById("trackingSteps").style.display = "flex";
        msg.innerText = "We have received your order!";
        
        // Tracking Steps
        status.innerText = "Order Placed 🧾";
        bar.style.width = "10%";
        setTimeout(() => {
            status.innerText = "Preparing Your Meal 🍳";
            bar.style.width = "40%";
        }, 3000);
        setTimeout(() => {
            status.innerText = "Out for Delivery 🚚";
            bar.style.width = "75%";
        }, 7000);
        setTimeout(() => {
            status.innerText = "Delivered ✅";
            bar.style.width = "100%";
            msg.innerText = "Your food has arrived. Enjoy!";
            document.getElementById("reviewBox").style.display = "block";
            
            // Clear cart now that it's delivered
            cart = [];
            qty = {};
            updateGlobalState();
        }, 11000);
    }
    function submitReview() {
        alert("Thank you for your feedback!");
        document.getElementById("reviewBox").style.display = "none";
        document.getElementById("reviewText").value = "";
    }
    // Initialize
    renderRestaurants();