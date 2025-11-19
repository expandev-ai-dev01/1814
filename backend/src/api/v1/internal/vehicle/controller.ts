import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';
import {
  vehicleList,
  getFilterOptions,
  getModelosByMarcas,
  VehicleListRequest,
  SortCriteria,
  TransmissionType,
} from '@/services/vehicle';

/**
 * @api {get} /api/v1/internal/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a paginated list of vehicles with optional filtering and sorting
 *
 * @apiParam {String[]} [marcas] Filter by brands (comma-separated)
 * @apiParam {String[]} [modelos] Filter by models (comma-separated)
 * @apiParam {Number} [anoMin] Minimum year filter
 * @apiParam {Number} [anoMax] Maximum year filter
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String[]} [cambios] Filter by transmission types (comma-separated)
 * @apiParam {String} [ordenacao] Sort criteria
 * @apiParam {Number} [pagina=1] Page number
 * @apiParam {Number} [itensPorPagina=12] Items per page
 *
 * @apiSuccess {Object[]} veiculos Array of vehicles
 * @apiSuccess {Number} total Total number of vehicles
 * @apiSuccess {Number} pagina Current page
 * @apiSuccess {Number} itensPorPagina Items per page
 * @apiSuccess {Number} totalPaginas Total pages
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate query parameters
     */
    const querySchema = z.object({
      marcas: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : undefined)),
      modelos: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : undefined)),
      anoMin: z.coerce.number().int().min(1900).optional(),
      anoMax: z.coerce.number().int().min(1900).optional(),
      precoMin: z.coerce.number().min(0).optional(),
      precoMax: z.coerce.number().min(0).optional(),
      cambios: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : undefined)),
      ordenacao: z.nativeEnum(SortCriteria).optional(),
      pagina: z.coerce.number().int().min(1).optional().default(1),
      itensPorPagina: z.coerce.number().int().min(1).max(100).optional().default(12),
    });

    const validatedQuery = querySchema.parse(req.query);

    /**
     * @validation Validate year range consistency
     */
    if (
      validatedQuery.anoMin !== undefined &&
      validatedQuery.anoMax !== undefined &&
      validatedQuery.anoMin > validatedQuery.anoMax
    ) {
      throw createError(
        'anoMinCannotBeGreaterThanAnoMax',
        HTTP_STATUS.BAD_REQUEST,
        'INVALID_YEAR_RANGE'
      );
    }

    /**
     * @validation Validate price range consistency
     */
    if (
      validatedQuery.precoMin !== undefined &&
      validatedQuery.precoMax !== undefined &&
      validatedQuery.precoMin > validatedQuery.precoMax
    ) {
      throw createError(
        'precoMinCannotBeGreaterThanPrecoMax',
        HTTP_STATUS.BAD_REQUEST,
        'INVALID_PRICE_RANGE'
      );
    }

    /**
     * @validation Validate transmission types
     */
    if (validatedQuery.cambios) {
      const validCambios = Object.values(TransmissionType);
      const invalidCambios = validatedQuery.cambios.filter(
        (c) => !validCambios.includes(c as TransmissionType)
      );
      if (invalidCambios.length > 0) {
        throw createError(
          'invalidTransmissionTypes',
          HTTP_STATUS.BAD_REQUEST,
          'INVALID_TRANSMISSION_TYPE',
          { invalidCambios }
        );
      }
    }

    const params: VehicleListRequest = {
      marcas: validatedQuery.marcas,
      modelos: validatedQuery.modelos,
      anoMin: validatedQuery.anoMin,
      anoMax: validatedQuery.anoMax,
      precoMin: validatedQuery.precoMin,
      precoMax: validatedQuery.precoMax,
      cambios: validatedQuery.cambios,
      ordenacao: validatedQuery.ordenacao,
      pagina: validatedQuery.pagina,
      itensPorPagina: validatedQuery.itensPorPagina,
    };

    const result = await vehicleList(params);

    res.json(
      successResponse(result, {
        page: result.pagina,
        pageSize: result.itensPorPagina,
        total: result.total,
      })
    );
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

/**
 * @api {get} /api/v1/internal/vehicle/filter-options Get Filter Options
 * @apiName GetFilterOptions
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available filter options based on current vehicle catalog
 *
 * @apiSuccess {String[]} marcas Available brands
 * @apiSuccess {String[]} modelos Available models
 * @apiSuccess {Number[]} anos Available years
 * @apiSuccess {String[]} cambios Available transmission types
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getFilterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const options = await getFilterOptions();
    res.json(successResponse(options));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/internal/vehicle/modelos-by-marcas Get Models by Brands
 * @apiName GetModelosByMarcas
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available models for selected brands
 *
 * @apiParam {String[]} marcas Selected brands (comma-separated)
 *
 * @apiSuccess {String[]} modelos Available models for selected brands
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function getModelosByMarcasHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /**
     * @validation Parse and validate query parameters
     */
    const querySchema = z.object({
      marcas: z
        .string()
        .optional()
        .transform((val) => (val ? val.split(',') : [])),
    });

    const validatedQuery = querySchema.parse(req.query);
    const modelos = await getModelosByMarcas(validatedQuery.marcas);

    res.json(successResponse(modelos));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('validationError', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
