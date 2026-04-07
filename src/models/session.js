const { Schema } = require("mongoose");

const sessionSchema = new Schema(
    {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' 
},
    accessToken: { type: String, required: true },
    refreshToken: {type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenVakidUtils: { type: Date, required: true },

    },
{ timestamps: true},
);

export const Session = model('Session', sessionSchema);