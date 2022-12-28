from flask import (
    Flask, 
    request, 
    redirect, 
    jsonify, 
    )
from werkzeug.security import check_password_hash
from services import Connecting


app = Flask(__name__)
conn: Connecting = Connecting()

conn.connect_db()
conn.create_tables()
conn.create_superuser('genitalgrinder90@gmail.com' ,'Brick92', 'root', 'Brick', '92')

user_id = ''
admin_id = ''


@app.route('/', methods=['GET', 'POST'])
def main():
    global user_id
    if request.method == 'POST':
        form = request.get_json()
        login = form.get('login')
        password = form.get('password')
        data = conn.check_user(login)
        if not data:
            return jsonify({"message" : "Данный логин не зарегистрирован"})
        elif login == data[0][1] and check_password_hash(data[0][3], password) == False:
            return jsonify({"message" : "неправильный пароль"})
        elif login == data[0][2] and check_password_hash(data[0][3], password) == True:
            user_id = data[0][0]
            return redirect('/shop')
    return jsonify({"message" : "autorization"})

@app.route('/reg', methods=['GET', 'POST'])
def reg():
    if request.method == 'POST':
        form = request.get_json()
        email = form.get('email')
        first_name = form.get('first_name')
        last_name = form.get('last_name')
        login = form.get('login')
        password = form.get('password')
        check_password = form.get('check_password')
        data = conn.check_user(login)
        mail_data = conn.check_user_mail(email)
        if password != check_password:
            return jsonify({"message" : "пароли не совпадают"})
        elif data:
            return jsonify({"message" : "логин занят"})
        elif mail_data:
            return jsonify({"message" : "Данный адрес уже зарегистрирован"})
        elif not data and not mail_data and password == check_password:
            conn.registration(email, login, password, first_name, last_name)
            return redirect('/')
    return jsonify({"message" : "registration"})

@app.route('/shop')
def search():
    global user_id
    data = conn.get_games()
    return jsonify(data, user_id)

@app.route('/shop/<int:id>', methods=['GET', 'POST'])
def get_game(id):
    global user_id
    if not user_id:
        return redirect('/')
    data = conn.list_result()
    basket_data = conn.check_add_in_basket(id)
    result: list[tuple] = []
    for i in data:
        if i[0] == int(id):
            price = i[5]
            result.append(i)
    if request.method == 'POST':
        data = conn.check_buy(id)
        if not data:
            return jsonify({"message" : "извините ключей не осталось"})
        elif data:
            if not basket_data:
                conn.add_to_basket(user_id, id)
                return jsonify(result, {"message" : "добавлено в корзину"})
            else:
                return jsonify(result, {"message" : "товар уже добавлен"})
    return jsonify(result)

@app.route('/shop/basket', methods=['GET', 'POST'])
def basket():
    global user_id
    if not user_id:
        return redirect('/')
    summ = 0
    data = conn.check_basket()
    if request.method == 'POST':
        form = request.get_json()
        games = form.getlist('id_game')
        for i in games:
            price: float = conn.get_price(i)
            summ += price[0]
        print(summ)
        user_money = conn.check_money(user_id)
        if user_money[0] < summ:
            return jsonify(data, {"message" : "У вас недостаточно средств"})
        for j in games:
            key = conn.get_key(j)
            conn.key_send(key[0])
            conn.add_game_to_user(user_id, j, key[0])
        conn.buy(summ, user_id)
        return jsonify(data, {"message" : "Поздравляем с приобретением!"})
    return jsonify(data, {"message" : "basket"})

@app.route('/personal-cab/<int:id>', methods=['GET','POST'])
def personal_cab(id):
    global user_id
    if not user_id:
        return redirect('/')
    personal_data = conn.get_user(id)
    games_data = conn.get_user_games(id)
    if request.method == 'POST':
        form = request.get_json()
        money = form.get('money')
        if int(money) > 0:
            conn.art_money(user_id, money)
            return jsonify(personal_data, games_data, user_id, {"message" : "success"})
    return jsonify(personal_data, games_data, user_id)

@app.route('/personal-cab/<int:id>/friends', methods=['GET', 'POST'])
def friends(id):
    global user_id
    if not user_id:
        return redirect('/')
    if request.method == 'POST':
        form = request.get_json()
        add_friend = form.get('add_friend')
        search = conn.search_friend(add_friend)
        if search:
            return jsonify(user_id, search, {"message" : "Найден пользователь"})
        return jsonify(user_id, search, {"message" : "Пользователь не найден"})
    return jsonify(user_id)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    global admin_id
    if request.method == 'POST':
        form = request.get_json()
        login = form.get('login')
        password = form.get('password')
        data = conn.check_admin(login)
        hash = check_password_hash(data[0][3], password)
        if not data:
            return jsonify({"message" : "неправильный логин"})
        elif login == data[0][2] and hash == False:
            return jsonify({"message" : "Неправильный пароль"})
        elif login == data[0][2] and hash == True:
            admin_id = data[0][0]
            return redirect('/admin/ok')
    return jsonify({"message" : "admin"})

@app.route('/admin/ok')
def admin_ok():
    return jsonify('<h2><a href="/admin/set-genres">Добавьте жанры</a></h2><h2><a href="/admin/add-game">Добавьте игры</h2><h2><a href="/admin/add-key">Добавить ключи</a></h2>')

@app.route('/admin/ok/set-genres', methods=['GET', 'POST'])
def add_genre():
    global admin_id
    if not admin_id:
        return redirect('/admin')
    data = conn.get_genres()
    if request.method == 'POST':
        form = request.get_json()
        title = form.get('title')
        description = form.get('description')
        if title and description:
            conn.set_genres(title, description)
            return jsonify(data, {"message" : "Genre was added"})
        return jsonify(data, {"message" : "Fields must be not empty"})
    return jsonify(data)

@app.route('/admin/ok/add-key', methods=['GET', 'POST'])
def add_key():
    global admin_id
    if not admin_id:
        return redirect('/admin')
    result = conn.list_result()
    data = conn.get_games()
    if request.method == 'POST':
        form = request.get_json()
        key = form.get('key')
        game = form.get('game')
        code_data = conn.check_key(key)
        if len(key) != 25:
            return jsonify(result, data, {"message" : "Длина ключа должна быть 25 символов"})
        elif not game:
            return jsonify(result, data, {"message" : "Игра не выбрана"})
        elif code_data:
            return jsonify(result, data, {"message" : "Ключ уже добавлен"})
        elif len(key) == 25 and data:
            conn.add_key(game, key)
            return jsonify(result, data, {"message" : "Ключ добавлен"})
    return jsonify(result, data)

@app.route('/admin/add-game', methods=['GET', 'POST'])
def add_game():
    global admin_id
    if not admin_id:
        return redirect('/admin')
    genre_data = conn.get_genres()
    games_data = conn.get_games()
    result = conn.list_result()
    if request.method == 'POST':
        form = request.get_json()
        title = form.get('title')
        description = form.get('description')
        price = form.get('price')
        genres = form.getlist('genre')
        if title and description and genres and title not in games_data:
            conn.set_game(title, description, price)
            game = conn.get_game_id(title)
            game_id = game[0][0]
            for i in genres:
                conn.res(game_id, i)
            return jsonify(genre_data, result, {"message" : "Game added!"})
        elif not title or not description or not genres or title in games_data:
            return jsonify(genre_data, result, {"message" : "fields must not be empty"})
    return jsonify(genre_data, result)


if __name__ == '__main__':
    app.run(port=1234, debug=True)