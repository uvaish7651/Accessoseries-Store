import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
    let { fullname, address, city, state, country, pincode, phoneNumber } = req.body;
    let userId = req.user;
    let userAddress = await Address.create({
        userId,
        fullname,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    });

    res.json({
        message: "Address added",
        success: true,
        userAddress
    })
}

export const getAddress = async (req, res) => {
    let address = await Address.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json({
        message: "address",
        userAddress: address[0]
    })
}