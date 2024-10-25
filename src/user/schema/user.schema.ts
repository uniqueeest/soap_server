import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, MaxLength, IsOptional } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	versionKey: false
};

@Schema(options)
export class User extends Document {
	@Prop({
		required: true,
		unique: true
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop({
		default: true
	})
	@IsBoolean()
	alarm: boolean;

	@Prop()
	@IsString()
	sns?: string;

	@Prop()
	@IsString()
	imgUrl?: string;

	@Prop({
		maxlength: 60,
		default: null
	})
	@IsString()
	@IsOptional()
	@MaxLength(60)
	status?: string;

	readonly readOnlyData: {
		id: string;
		email: string;
		name: string;
		alarm: string;
		sns: string;
		imgUrl: string;
		status: string;
	};
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
	return {
		id: this._id,
		email: this.email,
		name: this.name,
		alarm: this.alarm,
		sns: this.sns,
		imgUrl: this.imgUrl,
		status: this.status
	};
});
