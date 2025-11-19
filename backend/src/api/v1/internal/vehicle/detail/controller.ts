import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';
import { vehicleGetDetail } from '@/services/vehicle';

/**
 * @api {get} /api/v1/internal/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific vehicle
 *
 * @apiParam {String} id Vehicle identifier
 *
 * @apiSuccess {Object} vehicle Complete vehicle information
 * @apiSuccess {String} vehicle.id Vehicle identifier
 * @apiSuccess {String} vehicle.tituloAnuncio Advertisement title
 * @apiSuccess {Number} vehicle.preco Vehicle price
 * @apiSuccess {String} vehicle.statusVeiculo Vehicle availability status
 * @apiSuccess {Object[]} vehicle.fotos Photo gallery
 * @apiSuccess {Object} vehicle.especificacoes Technical specifications
 * @apiSuccess {Object[]} vehicle.itensSerie Standard items
 * @apiSuccess {Object[]} vehicle.opcionais Optional items
 * @apiSuccess {Object} vehicle.historico Vehicle history
 * @apiSuccess {Object} vehicle.condicoesVenda Sale conditions
 * @apiSuccess {Object[]} vehicle.veiculosSimilares Similar vehicles
 *
 * @apiError {String} NotFoundError Vehicle not found
 * @apiError {String} ValidationError Invalid vehicle ID
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate route parameters
     */
    const paramsSchema = z.object({
      id: z.string().min(1),
    });

    const validatedParams = paramsSchema.parse(req.params);

    /**
     * @rule {be-vehicle-detail-retrieval} Retrieve complete vehicle details
     */
    const vehicleDetail = await vehicleGetDetail(validatedParams.id);

    /**
     * @validation Check if vehicle exists
     */
    if (!vehicleDetail) {
      throw createError('vehicleNotFound', HTTP_STATUS.NOT_FOUND, 'VEHICLE_NOT_FOUND');
    }

    res.json(successResponse(vehicleDetail));
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code));
    } else if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('validationError', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
