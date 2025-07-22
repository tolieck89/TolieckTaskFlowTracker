import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  console.log("🔥 createUser called");
  console.log("📦 req.body:", req.body);


  try {
    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
        console.log("✅ Хешований пароль:", savedUser.password); 

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("❌ createUser error:", err.message);
    res.status(500).json({ message: err.message });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body
  console.log("📨 Запит на логін:", { email, password })

  try {
    const user = await User.findOne({ email })
    console.log("🔎 Знайдений юзер:", user)

    if (!user) {
      return res.status(401).json({ message: 'Користувача не знайдено' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log("✅ Паролі збігаються:", isMatch)

    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user.toObject()

    console.log("🎫 Токен:", token)

    res.json({ token, user: userWithoutPassword })
  } catch (error) {
    console.error("❌ loginUser error:", error.message)
    res.status(500).json({ message: 'Помилка при логіні', error: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні користувачів' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updated) {
      return res.status(404).json({ message: 'Користувача не знайдено' })
    }

    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: 'Помилка при оновленні', error })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Користувача не знайдено' })
    }

    res.json({ message: 'Користувача видалено' })
  } catch (error) {
    res.status(500).json({ message: 'Помилка при видаленні', error })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Помилка при отриманні профілю' })
  }
}
