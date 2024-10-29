    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const bookingSchema = new Schema({
    businessName: { type: String, },
    ownerName: { type: String, },
    email: { type: String, },
    phone: { type: String,},
    businessAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    venueName: String,
    venueType: String,
    capacity: Number,
    size: Number,
    availability: String,
    operatingHours: {
        from: String,
        to: String,
    },
    facilities: {
        airConditioning: Boolean,
        wifi: Boolean,
        parking: Boolean,
        audioVisual: Boolean,
        stagePodium: Boolean,
        catering: Boolean,
        decoration: Boolean,
        powerBackup: Boolean,
        handicapAccessibility: Boolean,
        security: Boolean,
    },
    seatingOptions: {
        theater: Boolean,
        classroom: Boolean,
        uShape: Boolean,
        roundTables: Boolean,
        banquet: Boolean,
    },
    pricing: {
        hourlyRate: Number,
        dailyRate: Number,
        discountForLongBookings: Boolean,
        discountRate: Number,
        additionalCharges: {
        cleaningFee: Number,
        overtimeFee: Number,
        },
    },
    venuePhotos: [{ type: String }],  // Expecting an array of strings (URLs)

    videoTour: String,
    virtualTourLink: String,
    bookingPolicy: String,
    cancellationPolicy: String,
    commissionAgreement: Boolean,
    legalAgreement: Boolean,
    bankDetails: {
        accountHolderName: String,
        bankName: String,
        accountNumber: String,
        ifscCode: String,
    },
    verificationDocuments: {
        businessLicense: String,
        gstCertificate: String,
        idProof: String,
    },
    loginCredentials: {
        username: String,
        password: String,
        confirmPassword: String,
    },
    additionalNotes: String,
    isApproved: {
        type: Boolean,
        default: false
    },
    });

    module.exports = mongoose.model('Booking', bookingSchema);
